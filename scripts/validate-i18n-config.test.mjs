import assert from 'node:assert/strict';
import {access, readFile} from 'node:fs/promises';
import test from 'node:test';

const configUrl = new URL('../docusaurus.config.ts', import.meta.url);
const homePageUrl = new URL('../src/pages/index.tsx', import.meta.url);
const zhDocsUrl = new URL('../i18n/zh-Hans/docusaurus-plugin-content-docs/current/intro.md', import.meta.url);

test('site defaults to English and exposes Simplified Chinese as a translated locale', async () => {
  const config = await readFile(configUrl, 'utf8');

  assert.match(config, /defaultLocale:\s*'en'/);
  assert.match(config, /locales:\s*\[\s*'en'\s*,\s*'zh-Hans'\s*\]/);
  assert.match(config, /type:\s*'localeDropdown'/);
  await access(zhDocsUrl);
});

test('custom homepage has English default content and Chinese locale content', async () => {
  const homePage = await readFile(homePageUrl, 'utf8');

  assert.match(homePage, /useDocusaurusContext/);
  assert.match(homePage, /title:\s*'Learn US Electrical Basics'/);
  assert.match(homePage, /'zh-Hans':\s*{/);
  assert.match(homePage, /title:\s*'美国电工基础学习路线'/);
});
