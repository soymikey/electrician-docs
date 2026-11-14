import assert from 'node:assert/strict';
import test from 'node:test';
import {readFile} from 'node:fs/promises';
import {glossarySpeechText} from '../src/components/GlossaryTerm/speechText.mjs';

test('speech is limited to textbook glossary entry headings', () => {
  assert.equal(glossarySpeechText('/zh-Hans/docs/nccer-core/glossary', '磨料（abrasive）:'), 'abrasive');
  assert.equal(glossarySpeechText('/docs/electrical/level-1/glossary', 'Alternating current (AC):'), 'Alternating current (AC)');
  assert.equal(glossarySpeechText('/zh-Hans/docs/hvacr/level-1/glossary/', '交流电（alternating current, AC）:'), 'alternating current, AC');
  assert.equal(glossarySpeechText('/docs/glossary', 'Ammeter:'), null);
  assert.equal(glossarySpeechText('/docs/nccer-core/glossary', 'Important note'), null);
});

test('every entry in all six textbook glossaries has English speech text', async () => {
  for (const course of ['nccer-core', 'electrical/level-1', 'hvacr/level-1']) {
    for (const locale of ['en', 'zh-Hans']) {
      const root = locale === 'en' ? 'docs' : 'i18n/zh-Hans/docusaurus-plugin-content-docs/current';
      const body = await readFile(new URL(`../${root}/${course}/glossary.md`, import.meta.url), 'utf8');
      const headings = [...body.matchAll(/^\*\*(.+?)\*\*/gm)];
      assert.ok(headings.length > 190);
      for (const [, heading] of headings) {
        const spoken = glossarySpeechText(`/${locale}/docs/${course}/glossary`, heading);
        assert.ok(spoken, heading);
        assert.doesNotMatch(spoken, /[\u3400-\u9fff]/, heading);
      }
    }
  }
});
