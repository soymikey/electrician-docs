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
    const qaSection = content.match(/## 本集 5 个问答[\s\S]*?(?=\n## 安全提醒|\n## 相关公式|$)/);
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
