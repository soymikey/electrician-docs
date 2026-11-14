import assert from 'node:assert/strict';
import test from 'node:test';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';

const root = new URL('../', import.meta.url);
const manifest = JSON.parse(await readFile(new URL('src/data/glossary-topics.json', root), 'utf8'));

test('topic grouping preserves each original entry once with matching bilingual topics and valid index targets', async () => {
  for (const [course, data] of Object.entries(manifest)) {
    for (const locale of ['en', 'zh-Hans']) {
      const base = locale === 'en' ? 'docs' : 'i18n/zh-Hans/docusaurus-plugin-content-docs/current';
      const body = await readFile(new URL(`${base}/${course}/glossary.md`, root), 'utf8');
      const expected = locale === 'en' ? data.entries.map((entry, termIndex) => ({...entry, termIndex})) : data.zhEntries;
      const entries = [...body.matchAll(/<a id="term-(\d+)"><\/a>\n\n([\s\S]*?)(?=\n\n<a id=|\n\n## |$)/g)];
      assert.equal(entries.length, expected.length, `${course} ${locale}`);
      assert.equal(new Set(entries.map(([, id]) => id)).size, entries.length);
      for (const [whole, id, block] of entries) {
        const source = expected.find((entry) => entry.termIndex === Number(id));
        assert.ok(source, id);
        assert.equal(createHash('sha256').update(block.trim()).digest('hex'), source.sha256, `${course} ${locale} ${id}: original definition changed`);
        const before = body.slice(0, body.indexOf(whole));
        const currentTopic = [...before.matchAll(/^## .*\{#topic-(\d+)\}/gm)].at(-1)?.[1];
        assert.equal(Number(currentTopic), data.entries[Number(id)].topic + 1);
        assert.ok(body.includes(`](#term-${id})`), `Missing alphabetical index link: ${id}`);
      }
      for (let c = 0; c < data.topics.length; c++) {
        assert.ok(body.includes(`{#topic-${c + 1}}`));
        assert.ok(body.includes(`](#topic-${c + 1})`));
      }
    }
  }
});
