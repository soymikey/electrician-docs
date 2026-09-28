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

test('NCCER Core catalog exposes all ten Sixth Edition modules', async () => {
  const overview = await readFile(projectFile('docs/nccer-core/index.md'), 'utf8');

  for (const [number, title, slug] of modules) {
    await access(projectFile(`docs/nccer-core/${slug}.md`));
    assert.match(overview, new RegExp(`${number}.*${title}`));
  }
});

test('NCCER Core callouts use Docusaurus custom-title syntax', async () => {
  const pages = await Promise.all([
    readFile(projectFile('docs/nccer-core/index.md'), 'utf8'),
    readFile(projectFile('docs/nccer-core/basic-safety.md'), 'utf8'),
    readFile(projectFile('docs/nccer-core/basic-rigging.md'), 'utf8'),
    readFile(projectFile('docs/nccer-core/material-handling.md'), 'utf8'),
  ]);

  for (const page of pages) {
    assert.doesNotMatch(page, /^:::(?:info|danger)\s+[^[]/m);
  }
});

test('Module 00100 includes the complete source-tracked study outline', async () => {
  const page = await readFile(
    projectFile('docs/nccer-core/build-your-future-in-construction.md'),
    'utf8',
  );
  const expectedHeadings = [
    '1.0.0 Overview of the Construction Industry',
    '1.1.1 State of the Industry',
    '1.1.2 Growing Demand for Skilled Craft Professionals',
    '1.1.3 Common Construction Industry Myths',
    '1.2.1 Famous Construction Examples',
    '1.2.2 Important Construction Innovations and Inventions',
    '2.0.0 Benefits of a Career in Construction',
    '2.1.1 Providing Essential Services',
    '2.1.2 Working to Help the Environment',
    '2.2.1 Competitive Salaries',
    '2.2.2 Starting Out Debt-Free',
    '2.2.3 Career Advancement and Mobility',
    '3.0.0 Construction Craft Careers',
    '3.1.0 Construction Industry Sectors',
    '3.2.1 Carpenter',
    '3.2.2 Electrician',
    '3.2.3 Welder',
    '3.2.4 Pipefitter',
    '3.2.5 Heavy Equipment Operator',
    '3.2.6 Crane Operator',
    '3.2.7 Ironworker',
    '3.2.8 HVAC Technician',
    '3.2.9 Project Manager',
    '3.2.10 More Construction Careers',
    '4.0.0 Starting Your Construction Career',
    '4.1.0 Career and Technical Education',
    '4.2.0 Craft Training and Apprenticeships',
    '4.3.1 Community College',
    '4.3.2 Four-Year Universities',
  ];

  for (const heading of expectedHeadings) {
    assert.ok(page.includes(heading), `missing Module 00100 heading: ${heading}`);
  }

  assert.match(page, /Verified module summary/);
  assert.match(page, /Online-source summary/);
  assert.match(page, /Core-6th-Edition\.pdf/);
  assert.match(page, /byf\.org/);
  assert.match(page, /apprenticeship\.gov/);
  assert.match(page, /bls\.gov/);
  assert.doesNotMatch(page, /\*\*Core summary:\*\* Awaiting textbook page/);
  assert.match(page, /NCCER Core, Sixth Edition.*Module 00100/);
  assert.match(page, /#### 1\.1\.1 State of the Industry \(pp\. 2–3\)/);
  assert.match(page, /#### 3\.2\.5 Heavy Equipment Operator \(pp\. 20–22\)/);
  assert.match(page, /### 4\.2\.0 Craft Training and Apprenticeships \(pp\. 28–29\)/);
  assert.doesNotMatch(page, /Compare with textbook/i);
  assert.doesNotMatch(page, /Compare NCCER's exact/i);
  assert.doesNotMatch(page, /Exact examples require textbook/i);
  assert.doesNotMatch(page, /Compare the historical list/i);
  assert.doesNotMatch(page, /textbook pp\./i);
  assert.doesNotMatch(page, /^\| Term \|/m, 'wide vocabulary tables overflow on mobile');
});

test('Module 00101 includes the complete photographed safety outline', async () => {
  const page = await readFile(projectFile('docs/nccer-core/basic-safety.md'), 'utf8');
  const expectedHeadings = [
    '1.0.0 Safety and Hazard Recognition',
    '1.1.1 Incident and Accident Categories',
    '1.2.1 Failure to Communicate',
    '1.2.10 Management System Failure',
    '1.3.2 Job Safety Analysis (JSA) and Task Safety Analysis (TSA)',
    '1.3.5 Safety Data Sheets',
    '2.0.0 Elevated Work and Fall Protection',
    '2.1.2 Unprotected Sides, Wall Openings, and Floor Holes',
    '2.2.3 PFAS Inspection',
    '2.2.7 Safety Nets',
    '2.3.5 Stairways',
    '2.4.3 Using Scaffolds',
    '3.0.0 Struck-By and Caught-in-Between Hazards',
    '3.1.3 Vehicle and Roadway Hazards',
    '3.2.1 Trenches and Excavations',
    '3.2.3 Cranes and Heavy Equipment',
    '4.0.0 Energy Release Hazards',
    '4.1.2 Ground Fault Circuit Interrupters',
    '4.1.5 If Someone Is Shocked',
    '4.2.1 Pressurized or High-Temperature Systems',
    '5.0.0 Personal Protective Equipment',
    '5.1.5 Hearing Protection',
    '5.2.1 Silica Standard',
    '5.2.5 Selecting a Respirator',
    '6.0.0 Job-Site Hazards',
    '6.1.4 Container Labeling',
    '6.1.7 Evacuation',
    '6.2.4 Heat Stroke',
    '6.2.7 Hypothermia',
    '6.3.4 Hot Work Permits',
    '6.4.5 Using a Fire Extinguisher',
    '6.5.0 Confined Spaces',
  ];

  for (const heading of expectedHeadings) {
    assert.ok(page.includes(heading), `missing Module 00101 heading: ${heading}`);
  }

  assert.match(page, /Photographed textbook outline/);
  assert.match(page, /Online-source summary/);
  assert.match(page, /osha\.gov/);
  assert.match(page, /Core-6th-Edition\.pdf/);
  assert.doesNotMatch(page, /^\| Term \|/m, 'wide vocabulary tables overflow on mobile');
});

test('NCCER Core catalog is reachable from the site navigation', async () => {
  const [sidebar, config, homepage] = await Promise.all([
    readFile(projectFile('sidebars.ts'), 'utf8'),
    readFile(projectFile('docusaurus.config.ts'), 'utf8'),
    readFile(projectFile('src/pages/index.tsx'), 'utf8'),
  ]);

  assert.match(sidebar, /label:\s*'NCCER Core 6th Edition'/);
  assert.match(sidebar, /'nccer-core\/index'/);
  assert.match(config, /label:\s*'NCCER Core 6th Edition'/);
  assert.match(config, /to:\s*'\/docs\/nccer-core'/);
  assert.match(homepage, /title:\s*'NCCER Core 6th Edition'/);
  assert.match(homepage, /href:\s*'\/docs\/nccer-core'/);
});
