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

test('Module 00100 includes the complete bilingual textbook study outline', async () => {
  const page = await readFile(
    projectFile('docs/nccer-core/build-your-future-in-construction.md'),
    'utf8',
  );
  const expectedHeadings = [
    '1.0.0 建筑行业概述 (Overview of the Construction Industry)',
    '1.1.1 行业现状 (State of the Industry',
    '1.1.2 对有技能工艺专业人员增长的需求 (Growing Demand for Skilled Craft Professionals',
    '1.1.3 常见的建筑行业误区 (Common Construction Industry Myths',
    '1.2.1 著名的建筑实例 (Famous Construction Examples',
    '1.2.2 重要的建筑创新与发明 (Important Construction Innovations and Inventions',
    '2.0.0 从事建筑职业的好处 (Benefits of a Career in Construction)',
    '2.1.1 提供核心服务 (Providing Essential Services',
    '2.1.2 致力于环境保护 (Working to Help the Environment',
    '2.2.1 具有竞争力的薪资 (Competitive Salaries',
    '2.2.2 无债务起步 / 边赚边学 (Starting Out Debt-Free / Earn as You Learn',
    '2.2.3 职业晋升与流动性 (Career Advancement and Mobility',
    '3.0.0 建筑工种与职业 (Construction Craft Careers)',
    '3.1.0 建筑行业四大领域 (Construction Industry Sectors',
    '3.2.1 木工 (Carpentry',
    '3.2.2 电工 (Electrician',
    '3.2.3 焊接工 (Welder',
    '3.2.4 管道工 (Pipefitter',
    '3.2.5 重型设备操作员 (Heavy Equipment Operator',
    '3.2.6 起重机 / 吊车操作员 (Crane Operator',
    '3.2.7 铁工 / 钢结构工 (Ironworker',
    '3.2.8 暖通空调技术员 (HVAC Technician',
    '3.2.9 项目经理 (Project Manager',
    '3.2.10 更多建筑职业 (More Construction Careers',
    '4.0.0 开启你的建筑职业生涯 (Starting Your Construction Career)',
    '4.1.0 职业与技术教育 (Career and Technical Education - CTE',
    '4.2.0 工种培训与学徒计划 (Craft Training and Apprenticeships',
    '4.3.1 社区学院 (Community College',
    '4.3.2 四年制大学 (Four-Year Universities',
  ];

  for (const heading of expectedHeadings) {
    assert.ok(page.includes(heading), `missing Module 00100 heading: ${heading}`);
  }

  assert.match(page, /构建你在建筑业的未来/);
  assert.match(page, /第六版课程数据快照/);
  assert.match(page, /工人缺乏技能/);
  assert.match(page, /拿最低工资/);
  assert.match(page, /不适合女性/);
  assert.match(page, /不使用科技/);
  assert.match(page, /非常危险/);
  assert.match(page, /破坏环境/);
  assert.match(page, /80% 在岗实操/);
  assert.match(page, /20% 课堂教学/);
  assert.doesNotMatch(page, /Online-source summary/);
  assert.match(page, /Core-6th-Edition\.pdf/);
  assert.match(page, /byf\.org/);
  assert.doesNotMatch(page, /\*\*Core summary:\*\* Awaiting textbook page/);
  assert.match(page, /Module 00100: Build Your Future in Construction/);
  assert.match(page, /#### 1\.1\.1 行业现状 \(State of the Industry, pp\. 2–3\)/);
  assert.match(page, /#### 3\.2\.5 重型设备操作员 \(Heavy Equipment Operator, pp\. 20–22\)/);
  assert.match(page, /### 4\.2\.0 工种培训与学徒计划 \(Craft Training and Apprenticeships, pp\. 28–29\)/);
  assert.match(page, /<a id="400-starting-your-construction-career"><\/a>/);
  assert.doesNotMatch(page, /\{#400-starting-your-construction-career\}/);
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
