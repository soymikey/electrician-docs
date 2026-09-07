import assert from 'node:assert/strict';
import {readdir, readFile} from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';

const videosDir = new URL('../docs/videos/', import.meta.url);

test('each video page has five collapsible QA entries', async () => {
  const files = (await readdir(videosDir))
    .filter((file) => file.endsWith('.md'))
    .sort();

  assert.equal(files.length, 43, 'video page count should stay aligned with the playlist');

  for (const file of files) {
    const content = await readFile(new URL(file, videosDir), 'utf8');
    const qaSection = content.match(/## 本集 5 个问答[\s\S]*?(?=\n## 学习检查清单|\n## 术语速查|\n## 安全提醒|\n## 相关公式|$)/);
    assert.ok(qaSection, `${path.join('docs/videos', file)} should have a QA section`);
    assert.equal(
      [...qaSection[0].matchAll(/<details>/g)].length,
      5,
      `${path.join('docs/videos', file)} should have 5 QA details`,
    );
    assert.equal(
      [...qaSection[0].matchAll(/<summary>/g)].length,
      5,
      `${path.join('docs/videos', file)} should have 5 QA summaries`,
    );
  }
});

test('each video page has enough self-study structure to stand alone', async () => {
  const files = (await readdir(videosDir))
    .filter((file) => file.endsWith('.md'))
    .sort();

  for (const file of files) {
    const content = await readFile(new URL(file, videosDir), 'utf8');
    const pagePath = path.join('docs/videos', file);

    for (const heading of [
      '## 这集讲什么',
      '## 核心概念详解',
      '## 现场怎么理解',
      '## 常见误区',
      '## 学习检查清单',
      '## 练习题 / 小测',
    ]) {
      assert.ok(content.includes(heading), `${pagePath} should include ${heading}`);
    }

    const lessonSection = content.match(
      /## 这集讲什么[\s\S]*?(?=\n## 本集 5 个问答|\n## 学习检查清单|\n## 术语速查|\n## 安全提醒|$)/,
    );
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
  }
});
