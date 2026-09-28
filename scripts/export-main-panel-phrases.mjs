import {readFile, writeFile} from 'node:fs/promises';

const sourceUrl = new URL('../src/data/main-panel-action-phrases.json', import.meta.url);
const outputUrl = new URL('../../电工口语收集/视频短语/How To Wire A Main Electrical Panel - 完整现场短句.md', import.meta.url);

const corePhrases = [
  ['02:42', 'essential', 'Go ahead and tighten it up.', '接着把它拧紧。'],
  ['08:52', 'essential', 'Back out the screw a little bit.', '把螺丝稍微松出来一点。'],
  ['09:16', 'essential', 'Slide it into place.', '把它滑到位。'],
  ['06:53', 'essential', 'Cut it to length.', '按需要的长度剪好。'],
  ['07:05', 'essential', "Don't cut it too short.", '不要剪得太短。'],
  ['05:52', 'essential', 'Strip the casing off.', '把外皮剥掉。'],
  ['10:14', 'essential', 'Make sure it is secure.', '确保它已经固定牢靠。'],
  ['29:57', 'essential', 'Keep the wires organized.', '把电线整理整齐。'],
  ['14:35', 'essential', 'Check your local code.', '查看当地电气规范。'],
  ['31:38', 'essential', 'Always double-check your work.', '一定要再次检查你的工作。'],
].map(([timestamp, category, phrase, zh], index) => ({id: `core-${index + 1}`, timestamp, category, phrase, zh}));

const categoryLabels = {
  essential: '核心必背',
  setup: '安装与定位',
  fastening: '拧紧与固定',
  cutting: '切线、剥线与外皮处理',
  routing: '穿线与布线',
  organizing: '整理与标记',
  connections: '端子、接线与断路器',
  grounding: '接地',
  inspection: '检查与验收',
  safety: '安全与隔离',
  communication: '通用现场交流',
};

const extracted = JSON.parse(await readFile(sourceUrl, 'utf8'));
const phrases = [...corePhrases, ...extracted];
const sections = [];

for (const [category, label] of Object.entries(categoryLabels)) {
  const items = phrases.filter((phrase) => phrase.category === category);
  if (items.length === 0) continue;
  sections.push(`## ${label}\n\n| 时间 | 现场英语 | 中文 |\n|---|---|---|`);
  sections.push(...items.map((item) => `| ${item.timestamp} | ${item.phrase.replaceAll('|', '\\|')} | ${item.zh.replaceAll('|', '\\|')} |`));
  sections.push('');
}

const content = `# How To Wire A Main Electrical Panel - 完整现场短句\n\n`
  + `来源字幕：\u0060/Users/maoqiangzheng/Downloads/gemini-code-1789828286738.txt\u0060\n\n`
  + `共收录 **${phrases.length} 条**。已排除频道宣传、商品推广和纯视频套话；重复出现的动作句已合并。\n\n`
  + `> 本清单用于英语和概念学习，不是施工指导。实际工作以 NEC、当地规范、设备说明、许可/验收和合格师傅指导为准。\n\n`
  + sections.join('\n');

await writeFile(outputUrl, content, 'utf8');
