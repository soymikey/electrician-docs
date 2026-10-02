import assert from 'node:assert/strict';
import {access, readFile} from 'node:fs/promises';
import test from 'node:test';

const projectFile = (path) => new URL(`../${path}`, import.meta.url);

const modules = [
  ['00102', 'Introduction to Construction Math', 'construction-math'],
  ['00103', 'Introduction to Hand Tools', 'hand-tools'],
  ['00104', 'Introduction to Power Tools', 'power-tools'],
  ['00105', 'Introduction to Construction Drawings', 'construction-drawings'],
  ['00106', 'Introduction to Basic Rigging', 'basic-rigging'],
  ['00107', 'Basic Communication Skills', 'communication-skills'],
  ['00108', 'Basic Employability Skills', 'employability-skills'],
  ['00109', 'Introduction to Material Handling', 'material-handling'],
];

const removedModules = [
  ['00100', 'Build Your Future in Construction', 'build-your-future-in-construction'],
  ['00101', 'Basic Safety', 'basic-safety'],
];

test('NCCER Core catalog exposes the eight retained Sixth Edition modules', async () => {
  const overview = await readFile(projectFile('docs/nccer-core/index.md'), 'utf8');

  for (const [number, title, slug] of modules) {
    await access(projectFile(`docs/nccer-core/${slug}.md`));
    assert.match(overview, new RegExp(`${number}.*${title}`));
  }

  for (const [number, title, slug] of removedModules) {
    await assert.rejects(access(projectFile(`docs/nccer-core/${slug}.md`)));
    assert.doesNotMatch(overview, new RegExp(`${number}.*${title}`));
  }
});

test('NCCER Core callouts use Docusaurus custom-title syntax', async () => {
  const pages = await Promise.all([
    readFile(projectFile('docs/nccer-core/index.md'), 'utf8'),
    readFile(projectFile('docs/nccer-core/basic-rigging.md'), 'utf8'),
    readFile(projectFile('docs/nccer-core/material-handling.md'), 'utf8'),
  ]);

  for (const page of pages) {
    assert.doesNotMatch(page, /^:::(?:info|danger)\s+[^[]/m);
  }
});

test('NCCER Core catalog is reachable from the site navigation', async () => {
  const [sidebar, config, homepage] = await Promise.all([
    readFile(projectFile('sidebars.ts'), 'utf8'),
    readFile(projectFile('docusaurus.config.ts'), 'utf8'),
    readFile(projectFile('src/pages/index.tsx'), 'utf8'),
  ]);

  assert.match(sidebar, /label:\s*'NCCER Core 6th Edition'/);
  assert.match(sidebar, /'nccer-core\/index'/);
  assert.doesNotMatch(sidebar, /build-your-future-in-construction/);
  assert.doesNotMatch(sidebar, /basic-safety/);
  assert.match(config, /label:\s*'NCCER Core 6th Edition'/);
  assert.match(config, /to:\s*'\/docs\/nccer-core'/);
  assert.match(homepage, /title:\s*'NCCER Core 6th Edition'/);
  assert.match(homepage, /href:\s*'\/docs\/nccer-core'/);
});
