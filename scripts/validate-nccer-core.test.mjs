import assert from 'node:assert/strict';
import {access, readFile} from 'node:fs/promises';
import test from 'node:test';

const projectFile = (path) => new URL(`../${path}`, import.meta.url);

const modules = [
  ['00100', 'Build Your Future in Construction', 'build-your-future-in-construction'],
  ['00101', 'Basic Safety', 'basic-safety'],
  ['00102', 'Introduction to Construction Math', 'construction-math'],
  ['00103', 'Introduction to Hand Tools', 'hand-tools'],
  ['00104', 'Introduction to Power Tools', 'power-tools'],
  ['00105', 'Introduction to Construction Drawings', 'construction-drawings'],
  ['00106', 'Introduction to Basic Rigging', 'basic-rigging'],
  ['00107', 'Basic Communication Skills', 'communication-skills'],
  ['00108', 'Basic Employability Skills', 'employability-skills'],
  ['00109', 'Introduction to Material Handling', 'material-handling'],
];

const removedModules = [];

test('NCCER Core catalog exposes all ten Sixth Edition modules', async () => {
  const overview = await readFile(projectFile('docs/nccer-core/index.md'), 'utf8');

  assert.doesNotMatch(overview, /\]\([^)]+\.md\)/);

  for (const [number, title, slug] of modules) {
    await access(projectFile(`docs/nccer-core/${slug}.md`));
    assert.match(overview, new RegExp(`${number}.*${title}`));
  }

  for (const [number, title, slug] of removedModules) {
    await assert.rejects(access(projectFile(`docs/nccer-core/${slug}.md`)));
    assert.doesNotMatch(overview, new RegExp(`${number}.*${title}`));
  }
});

test('Module 00100 provides a complete active-recall card deck', async () => {
  const [page, chinesePage] = await Promise.all([
    readFile(
      projectFile('docs/nccer-core/build-your-future-in-construction.md'),
      'utf8',
    ),
    readFile(
      projectFile(
        'i18n/zh-Hans/docusaurus-plugin-content-docs/current/nccer-core/build-your-future-in-construction.md',
      ),
      'utf8',
    ),
  ]);

  for (const section of [
    'Section 1: Overview of the Construction Industry',
    'Section 2: Benefits of a Career in Construction',
    'Section 3: Construction Craft Careers',
    'Section 4: Starting Your Construction Career',
  ]) {
    assert.match(page, new RegExp(section));
  }

  for (const topic of [
    '1.1.3 Common Construction Industry Myths',
    '2.2.3 Career Advancement and Mobility',
    '3.2.2 Electrician',
    '3.2.6 Crane Operator',
    '4.2.0 Craft Training and Apprenticeships',
    '4.3.2 Four-Year Universities',
  ]) {
    assert.match(page, new RegExp(topic));
  }

  assert.equal(page.match(/\*\*Front:\*\*/g)?.length, 31);
  assert.equal(page.match(/\*\*Back:\*\*/g)?.length, 31);
  assert.equal(chinesePage.match(/\*\*正面：\*\*/g)?.length, 31);
  assert.equal(chinesePage.match(/\*\*背面：\*\*/g)?.length, 31);
  assert.match(page, /Baby Boomers/);
  assert.match(page, /80% on-the-job learning/);
  assert.match(page, /two to four years/);
  assert.match(page, /Section Review focus/g);
  assert.match(chinesePage, /80% 在岗学习/);
  assert.match(chinesePage, /Section Review 原题重点/g);
  assert.doesNotMatch(page, /Online-source summary/);
});

test('Module 00101 provides an English-only active-recall card deck', async () => {
  const page = await readFile(
    projectFile('docs/nccer-core/basic-safety.md'),
    'utf8',
  );

  for (const section of [
    'Section 1: Safety and Hazard Recognition',
    'Section 2: Elevated Work and Fall Protection',
    'Section 3: Struck-By and Caught-in-Between Hazards',
    'Section 4: Energy Release Hazards',
    'Section 5: Personal Protective Equipment',
    'Section 6: Job-Site Hazards',
  ]) {
    assert.match(page, new RegExp(section));
  }

  for (const topic of [
    '1.3.2 Job Safety Analysis',
    '2.2.3 PFAS Inspection',
    '3.2.1 Trenches and Excavations',
    '4.2.0 Lockout/Tagout Requirements',
    '5.2.1 Silica Standard',
    '6.2.4 Heat Stroke',
    '6.4.5 Using a Fire Extinguisher',
    '6.5.0 Confined Spaces',
  ]) {
    assert.match(page, new RegExp(topic));
  }

  assert.equal(page.match(/\*\*Front:\*\*/g)?.length, 82);
  assert.equal(page.match(/\*\*Back:\*\*/g)?.length, 82);
  assert.equal(page.match(/Section Review focus/g)?.length, 6);
  assert.match(page, /do not replace employer procedures/i);
  assert.doesNotMatch(page, /Online-source summary|Use textbook pp\.|Awaiting textbook/);
  assert.doesNotMatch(page, /\*\*正面：\*\*|\*\*背面：\*\*/);

  await assert.rejects(
    access(
      projectFile(
        'i18n/zh-Hans/docusaurus-plugin-content-docs/current/nccer-core/basic-safety.md',
      ),
    ),
  );
});

test('Module 00107 provides an English-only active-recall card deck', async () => {
  const page = await readFile(
    projectFile('docs/nccer-core/communication-skills.md'),
    'utf8',
  );

  for (const section of [
    'Section 1: Communication',
    'Section 2: Reading and Writing',
  ]) {
    assert.match(page, new RegExp(section));
  }

  for (const topic of [
    '1.1.1 Nonverbal Communication',
    '1.1.2 Listening and Speaking Skills',
    '1.2.1 Barriers to Listening',
    '1.3.1 Placing Telephone Calls',
    '1.3.2 Receiving Telephone Calls',
    '2.1.0 The Importance of Reading and Writing Skills',
    '2.3.1 Emails',
    '2.3.2 Texting',
  ]) {
    assert.match(page, new RegExp(topic));
  }

  assert.equal(page.match(/\*\*Front:\*\*/g)?.length, 16);
  assert.equal(page.match(/\*\*Back:\*\*/g)?.length, 16);
  assert.equal(page.match(/Section Review focus/g)?.length, 2);
  assert.match(page, /two-way communication/);
  assert.match(page, /clear, concise, correct, complete, and considerate/);
  assert.match(page, /Never send texts while driving or operating machinery/);
  assert.doesNotMatch(page, /\*\*正面：\*\*|\*\*背面：\*\*/);

  await assert.rejects(
    access(
      projectFile(
        'i18n/zh-Hans/docusaurus-plugin-content-docs/current/nccer-core/communication-skills.md',
      ),
    ),
  );
});

test('Module 00108 provides an English-only active-recall card deck', async () => {
  const page = await readFile(
    projectFile('docs/nccer-core/employability-skills.md'),
    'utf8',
  );

  for (const section of [
    'Section 1: Opportunities in the Construction Industry',
    'Section 2: Critical Thinking and Problem Solving',
    'Section 3: Relationship and Social Skills',
  ]) {
    assert.match(page, new RegExp(section));
  }

  for (const topic of [
    '1.1.0 The Construction Business',
    '1.2.0 Entering the Construction Workforce',
    '2.1.1 Barriers to Problem Solving',
    '2.2.1 Defining the Problem',
    '2.3.5 Handling Delays',
    '3.1.2 Work Ethic',
    '3.2.1 Resolving Conflicts with Co-Workers',
    '3.3.2 Receiving Constructive Criticism',
    '3.4.1 Harassment',
    '3.5.1 Leadership Skills',
  ]) {
    assert.match(page, new RegExp(topic));
  }

  assert.equal(page.match(/\*\*Front:\*\*/g)?.length, 31);
  assert.equal(page.match(/\*\*Back:\*\*/g)?.length, 31);
  assert.equal(page.match(/Section Review focus/g)?.length, 3);
  assert.match(page, /five-step problem-solving process/);
  assert.match(page, /zero-tolerance policy/);
  assert.match(page, /hands-off, democratic, and autocratic/);
  assert.doesNotMatch(page, /\*\*正面：\*\*|\*\*背面：\*\*/);

  await assert.rejects(
    access(
      projectFile(
        'i18n/zh-Hans/docusaurus-plugin-content-docs/current/nccer-core/employability-skills.md',
      ),
    ),
  );
});

test('Module 00109 provides an English-only active-recall card deck', async () => {
  const page = await readFile(
    projectFile('docs/nccer-core/material-handling.md'),
    'utf8',
  );

  for (const section of [
    'Section 1: Material Handling',
    'Section 2: Material Handling Equipment',
  ]) {
    assert.match(page, new RegExp(section));
  }

  for (const topic of [
    '1.1.1 Pre-Task Planning',
    '1.1.3 Proper Lifting and Lowering Procedures',
    '1.2.1 Stacking and Storing Materials',
    '1.3.2 The Bowline',
    '2.1.2 Hand Trucks',
    '2.1.5 Roller Skids',
    '2.2.2 Concrete Mule',
    '2.2.4 Industrial Forklift',
    '2.2.6 Hand Signals',
  ]) {
    assert.match(page, new RegExp(topic));
  }

  assert.equal(page.match(/\*\*Front:\*\*/g)?.length, 30);
  assert.equal(page.match(/\*\*Back:\*\*/g)?.length, 30);
  assert.equal(page.match(/Section Review focus/g)?.length, 2);
  assert.match(page, /keep the load close to your body/i);
  assert.match(page, /trained and certified operator/i);
  assert.match(page, /agree on the signals/i);
  assert.doesNotMatch(page, /Use textbook pp\.|Awaiting textbook/);
  assert.doesNotMatch(page, /\*\*正面：\*\*|\*\*背面：\*\*/);

  await assert.rejects(
    access(
      projectFile(
        'i18n/zh-Hans/docusaurus-plugin-content-docs/current/nccer-core/material-handling.md',
      ),
    ),
  );
});

test('Module 00104 provides an English-only active-recall card deck', async () => {
  const page = await readFile(
    projectFile('docs/nccer-core/power-tools.md'),
    'utf8',
  );

  for (const section of [
    'Section 1: Power Drills/Drivers',
    'Section 2: Power Saws',
    'Section 3: Grinders and Oscillating Multi-Tools',
    'Section 4: Miscellaneous Power Tools',
  ]) {
    assert.match(page, new RegExp(section));
  }

  for (const topic of [
    '1.2.2 Cordless Tools and Batteries',
    '1.2.6 Electromagnetic Drill Presses',
    '1.3.3 Impact Drivers',
    '1.4.3 Pneumatic Tool Safety and Maintenance Guidelines',
    '2.1.1 Circular Saw Safety Guidelines and Maintenance',
    '2.2.3 Jigsaw and Reciprocating Saw Safety and Maintenance',
    '2.3.0 Portable Band Saws',
    '2.4.2 Abrasive Cutoff Saws',
    '2.5.1 Table Saw Safety and Maintenance',
    '3.1.1 Grinder Safety and Maintenance',
    '3.2.0 Grinder Attachments and Accessories',
    '3.3.1 Oscillating Multi-Tool Safety and Maintenance',
    '4.1.1 Power Nailer Safety and Maintenance',
    '4.2.1 Hydraulic Jack Safety and Maintenance',
  ]) {
    assert.match(page, new RegExp(topic));
  }

  assert.equal(page.match(/\*\*Front:\*\*/g)?.length, 47);
  assert.equal(page.match(/\*\*Back:\*\*/g)?.length, 47);
  assert.equal(page.match(/Section Review focus/g)?.length, 4);
  assert.match(page, /disconnect.*power source/i);
  assert.match(page, /rated maximum speed/i);
  assert.match(page, /trained and certified/i);
  assert.match(page, /never leave a jack under a load as a support/i);
  assert.match(page, /do not replace employer procedures/i);
  assert.doesNotMatch(page, /Use textbook pp\.|Awaiting textbook/);
  assert.doesNotMatch(page, /\*\*正面：\*\*|\*\*背面：\*\*/);

  await assert.rejects(
    access(
      projectFile(
        'i18n/zh-Hans/docusaurus-plugin-content-docs/current/nccer-core/power-tools.md',
      ),
    ),
  );
});

test('NCCER Core callouts use Docusaurus custom-title syntax', async () => {
  const pages = await Promise.all([
    readFile(projectFile('docs/nccer-core/index.md'), 'utf8'),
    readFile(projectFile('docs/nccer-core/build-your-future-in-construction.md'), 'utf8'),
    readFile(projectFile('docs/nccer-core/basic-safety.md'), 'utf8'),
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
  assert.match(sidebar, /build-your-future-in-construction/);
  assert.match(sidebar, /basic-safety/);
  assert.match(config, /label:\s*'NCCER Core 6th Edition'/);
  assert.match(config, /to:\s*'\/docs\/nccer-core'/);
  assert.match(homepage, /title:\s*'NCCER Core 6th Edition'/);
  assert.match(homepage, /href:\s*'\/docs\/nccer-core'/);
});
