import assert from 'node:assert/strict';
import {readdir, readFile} from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';

const videosDir = new URL('../i18n/zh-Hans/docusaurus-plugin-content-docs/current/videos/', import.meta.url);

test('each video page has collapsible self-test entries', async () => {
  const files = (await readdir(videosDir))
    .filter((file) => file.endsWith('.md'))
    .sort();

  assert.equal(files.length, 43, 'video page count should stay aligned with the playlist');

  for (const file of files) {
    const content = await readFile(new URL(file, videosDir), 'utf8');
    const qaSection = content.match(/## 本集自测题[\s\S]*?(?=\n## 学习检查清单|\n## 安全提醒|$)/);
    assert.ok(qaSection, `${path.join('docs/videos', file)} should have a self-test section`);
    assert.equal([...qaSection[0].matchAll(/<details>/g)].length, 6, `${path.join('docs/videos', file)} should have 6 self-test details`);
    assert.equal([...qaSection[0].matchAll(/<summary>/g)].length, 6, `${path.join('docs/videos', file)} should have 6 self-test summaries`);
  }
});

test('each video page has enough self-study structure to stand alone', async () => {
  const files = (await readdir(videosDir))
    .filter((file) => file.endsWith('.md'))
    .sort();

  for (const file of files) {
    const content = await readFile(new URL(file, videosDir), 'utf8');
    const pagePath = path.join('docs/videos', file);

    const requiredHeadings = ['## Why：为什么要学这一集', '## How：怎么理解这一集', '## What：本集核心知识点', '## 现场怎么用', '## 常见误区', '## 术语速查', '## 本集自测题', '## 学习检查清单', '## 安全提醒'];

    for (const heading of requiredHeadings) {
      assert.ok(content.includes(heading), `${pagePath} should include ${heading}`);
    }

    const lessonSection = content.match(/## Why：为什么要学这一集[\s\S]*?(?=\n## 常见误区|\n## 术语速查|$)/);
    assert.ok(lessonSection, `${pagePath} should have a self-study lesson block before QA`);
    assert.ok(
      lessonSection[0].length > 900,
      `${pagePath} self-study lesson block should be detailed enough for reading`,
    );
    assert.equal(
      /^### 概念 \d+$/m.test(lessonSection[0]),
      false,
      `${pagePath} should use meaningful concept headings instead of numbered placeholders`,
    );
    assert.equal(
      lessonSection[0].includes('这句话要放进完整场景里理解'),
      false,
      `${pagePath} should not use generic template explanation text`,
    );
    assert.equal(
      lessonSection[0].includes('它检测的异常是什么'),
      false,
      `${pagePath} should not apply protection-device wording to unrelated concepts`,
    );
    assert.equal(
      /^### .*\.{3}$/m.test(lessonSection[0]),
      false,
      `${pagePath} should use complete concept headings instead of truncated headings`,
    );
    assert.equal(
      content.includes('## 复习问题'),
      false,
      `${pagePath} should use the clearer learning checklist heading`,
    );
    assert.equal(
      content.includes('## 本集 5 个问答'),
      false,
      `${pagePath} should use self-test questions instead of the old QA heading`,
    );
    assert.ok(
      content.includes('本地已拉取的 YouTube 字幕'),
      `${pagePath} should explain that it is grounded in local transcript material`,
    );
  }
});

test('video lessons avoid generic repeated content', async () => {
  const files = (await readdir(videosDir))
    .filter((file) => file.endsWith('.md'))
    .sort();

  const genericPhrases = [
    '这一集最核心的学习目标是什么？',
    '复习本集时，应该先抓哪条主线？',
    '这个概念在美国住宅或商业现场会落到哪里？',
    '理解本集主题在电工基础、美国住宅电路、现场安全或控制系统中的位置',
    '把概念对应到美国住宅常见 120/240V、插座、开关、配电箱和 grounding/bonding',
    '在住宅现场，先把概念落到插座、开关盒、灯具、GFCI、断路器、配电盘、设备铭牌和仪表测量点上',
  ];

  for (const file of files) {
    const content = await readFile(new URL(file, videosDir), 'utf8');
    const pagePath = path.join('docs/videos', file);
    const whatSection = content.match(/## What：本集核心知识点[\s\S]*?(?=\n## 现场怎么用|$)/);

    assert.ok(whatSection, `${pagePath} should have a What section`);

    const conceptHeadings = [...whatSection[0].matchAll(/^### (.+)$/gm)].map((match) => match[1]);
    assert.equal(
      new Set(conceptHeadings).size,
      conceptHeadings.length,
      `${pagePath} should not repeat concept headings inside one lesson`,
    );

    for (const phrase of genericPhrases) {
      assert.equal(content.includes(phrase), false, `${pagePath} should not contain generic phrase: ${phrase}`);
    }
  }
});

test('receptacle and power outlet lessons are intentionally different', async () => {
  const receptacle = await readFile(
    new URL('17-how-receptacles-work-the-basic-working-principle-explai.md', videosDir),
    'utf8',
  );
  const outlet = await readFile(new URL('35-how-do-power-outlets-work.md', videosDir), 'utf8');

  assert.notEqual(
    receptacle.match(/## Why：为什么要学这一集[\s\S]*?(?=\n## 安全提醒|$)/)?.[0],
    outlet.match(/## Why：为什么要学这一集[\s\S]*?(?=\n## 安全提醒|$)/)?.[0],
    'video 17 and video 35 should not share the same generated lesson body',
  );

  assert.ok(receptacle.includes('分离片') || receptacle.includes('tab'), 'video 17 should cover receptacle tabs');
  assert.ok(outlet.includes('上半部') || outlet.includes('下半部'), 'video 35 should cover split outlet behavior');
});

test('field application sections are unique per video', async () => {
  const files = (await readdir(videosDir))
    .filter((file) => file.endsWith('.md'))
    .sort();
  const sections = new Map();

  for (const file of files) {
    const content = await readFile(new URL(file, videosDir), 'utf8');
    const section = content.match(/## 现场怎么用\n([\s\S]*?)(?=\n## 常见误区|$)/)?.[1].trim();
    assert.ok(section, `${path.join('docs/videos', file)} should have a field application section`);

    const existing = sections.get(section);
    assert.equal(existing, undefined, `${path.join('docs/videos', file)} repeats field section from ${existing}`);
    sections.set(section, file);
  }
});
