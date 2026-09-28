import assert from 'node:assert/strict';
import {access, readFile} from 'node:fs/promises';
import test from 'node:test';

const englishPageUrl = new URL('../docs/spoken-english/main-panel-phrases.mdx', import.meta.url);
const chinesePageUrl = new URL(
  '../i18n/zh-Hans/docusaurus-plugin-content-docs/current/spoken-english/main-panel-phrases.mdx',
  import.meta.url,
);
const speakButtonUrl = new URL('../src/components/SpeakButton/index.tsx', import.meta.url);
const phraseDeckUrl = new URL('../src/components/PhraseDeck/index.tsx', import.meta.url);
const extractedPhrasesUrl = new URL('../src/data/main-panel-action-phrases.json', import.meta.url);
const extractionNotesUrl = new URL('../../电工口语收集/视频短语/How To Wire A Main Electrical Panel - 完整现场短句.md', import.meta.url);
const sidebarUrl = new URL('../sidebars.ts', import.meta.url);
const chineseSidebarLabelsUrl = new URL(
  '../i18n/zh-Hans/docusaurus-plugin-content-docs/current.json',
  import.meta.url,
);

test('main-panel jobsite phrases are available in both locales and the sidebar', async () => {
  const [englishPage, chinesePage, sidebar, chineseSidebarLabels] = await Promise.all([
    readFile(englishPageUrl, 'utf8'),
    readFile(chinesePageUrl, 'utf8'),
    readFile(sidebarUrl, 'utf8'),
    readFile(chineseSidebarLabelsUrl, 'utf8'),
  ]);

  assert.match(sidebar, /label:\s*'Jobsite English'/);
  assert.match(sidebar, /'spoken-english\/main-panel-phrases'/);
  assert.match(chineseSidebarLabels, /"message":\s*"现场口语"/);

  for (const page of [englishPage, chinesePage]) {
    assert.match(page, /Go ahead and tighten it up\./);
    assert.match(page, /Don't cut it too short\./);
    assert.match(page, /Always double-check your work\./);
    assert.match(page, /## Safety boundary|## 安全边界/);
  }
});

test('transcript extraction covers the full set of unique jobsite actions', async () => {
  const phrases = JSON.parse(await readFile(extractedPhrasesUrl, 'utf8'));
  const categories = new Set(phrases.map((phrase) => phrase.category));
  const ids = phrases.map((phrase) => phrase.id);
  const phraseText = phrases.map((phrase) => phrase.phrase).join('\n').toLowerCase();

  assert.ok(phrases.length >= 55, 'should retain at least 55 additional jobsite phrases');
  assert.equal(new Set(ids).size, ids.length, 'phrase ids should be unique');
  assert.ok(categories.size >= 7, 'jobsite phrases should cover at least 7 work categories');
  assert.ok(phrases.every((phrase) => /^\d{2}:\d{2}$/.test(phrase.timestamp)));

  for (const action of ['hold it in place', 'tap it out', 'strip the casing off', 'cut away from the wire', 'fish it into the house', 'snap it into place', 'tuck these wires', 'give it a little wiggle', 'leave it uncovered until inspection']) {
    assert.ok(phraseText.includes(action), `missing jobsite action: ${action}`);
  }

  await access(extractionNotesUrl);
});

test('phrase deck is collapsible, tracks mastery, and speaks only examples', async () => {
  const [englishPage, chinesePage, speakButton, phraseDeck] = await Promise.all([
    readFile(englishPageUrl, 'utf8'),
    readFile(chinesePageUrl, 'utf8'),
    readFile(speakButtonUrl, 'utf8'),
    readFile(phraseDeckUrl, 'utf8'),
  ]);

  for (const page of [englishPage, chinesePage]) {
    assert.match(page, /import PhraseDeck from '@site\/src\/components\/PhraseDeck';/);
    assert.equal([...page.matchAll(/<PhraseDeck locale=/g)].length, 1);
    assert.doesNotMatch(page, /<SpeakButton/);
  }

  assert.match(phraseDeck, /type="checkbox"/);
  assert.match(phraseDeck, /const \[isOpen, setIsOpen\] = useState\(false\)/);
  assert.match(phraseDeck, /localStorage\.setItem/);
  assert.match(phraseDeck, /mastered\.size/);
  assert.match(phraseDeck, /<SpeakButton text=\{phrase\.example\}/);
  assert.match(phraseDeck, /main-panel-action-phrases\.json/);
  assert.doesNotMatch(phraseDeck, /<SpeakButton text=\{phrase\.phrase\}/);
  assert.match(speakButton, /window\.speechSynthesis\.cancel\(\)/);
  assert.match(speakButton, /new SpeechSynthesisUtterance\(text\)/);
  assert.match(speakButton, /utterance\.lang = 'en-US'/);
});
