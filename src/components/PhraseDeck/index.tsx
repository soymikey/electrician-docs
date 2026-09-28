import React, {useEffect, useState} from 'react';
import actionPhrases from '@site/src/data/main-panel-action-phrases.json';

import SpeakButton from '../SpeakButton';
import styles from './phraseDeck.module.css';

type Locale = 'en' | 'zh-Hans';

type Phrase = {
  category?: string;
  id: string;
  phrase: string;
  example: string;
  meaning: Record<Locale, string>;
  timestamp?: string;
  translation: string;
};

const STORAGE_KEY = 'electrician-docs:main-panel-phrases:mastered';

const corePhrases: Phrase[] = [
  {
    id: 'tighten-it-up',
    phrase: 'Go ahead and tighten it up.',
    example: 'Make sure the wire is fully seated, then go ahead and tighten it up.',
    meaning: {
      en: '`Go ahead and` often means "next, do this" on a jobsite; it does not necessarily mean to walk forward.',
      'zh-Hans': '接着把它拧紧。现场口语中，go ahead and 常表示“接下来就……”，不一定是“往前走”。',
    },
    translation: '确认电线已经完全插到位，然后把它拧紧。',
  },
  {
    id: 'back-out-screw',
    phrase: 'Back out the screw a little bit.',
    example: 'Back out the screw a little bit so the conductor can slide into the lug.',
    meaning: {
      en: 'Back out means loosen or unscrew; it does not mean remove the screw completely.',
      'zh-Hans': '把螺丝松出来一点。Back out 是拧松，不是一定要把螺丝完全取下。',
    },
    translation: '把螺丝稍微松一点，让导线可以滑进接线端子。',
  },
  {
    id: 'slide-into-place',
    phrase: 'Slide it into place.',
    example: 'Line up the connector and slide it into place.',
    meaning: {
      en: 'Move it smoothly into the final position where the part belongs.',
      'zh-Hans': '把它滑入正确位置。Into place 就是零件应该在的最终位置。',
    },
    translation: '对准接头，然后把它滑到位。',
  },
  {
    id: 'cut-to-length',
    phrase: 'Cut it to length.',
    example: 'Route the wire first, then cut it to length.',
    meaning: {
      en: 'Cut it to the length needed for the actual installation.',
      'zh-Hans': '根据实际需要的长度剪断。',
    },
    translation: '先把线路整理好，然后按需要的长度剪断。',
  },
  {
    id: 'not-too-short',
    phrase: "Don't cut it too short.",
    example: "Leave yourself a little extra wire. Don't cut it too short.",
    meaning: {
      en: 'Leave enough extra wire for installation and future service.',
      'zh-Hans': '不要剪得太短，要留出安装和以后维修的余量。',
    },
    translation: '给自己多留一点线，不要剪得太短。',
  },
  {
    id: 'strip-casing',
    phrase: 'Strip the casing off.',
    example: 'Carefully strip the casing off without nicking the conductors.',
    meaning: {
      en: 'Remove the cable jacket. Here, casing means the outer covering, not the insulation on each conductor.',
      'zh-Hans': '把电缆外层护套剥掉。这里的 casing 指外皮，不是每根导线上的绝缘层。',
    },
    translation: '小心剥掉外皮，不要划伤里面的导线。',
  },
  {
    id: 'make-secure',
    phrase: 'Make sure it is secure.',
    example: 'Give the cable a gentle tug to make sure it is secure.',
    meaning: {
      en: 'Confirm that the part or connection is firm and will not come loose.',
      'zh-Hans': '确认部件或连接已经牢靠，不会松动。',
    },
    translation: '轻轻拉一下电缆，确保它已经固定牢靠。',
  },
  {
    id: 'organize-wires',
    phrase: 'Keep the wires organized.',
    example: 'Use smooth bends and keep the wires organized inside the panel.',
    meaning: {
      en: 'Arrange wires neatly along clear paths so they are easier to identify and inspect.',
      'zh-Hans': '将电线按路径整理整齐，方便识别和检查。',
    },
    translation: '使用平滑的弯曲，并保持配电箱内的电线整齐。',
  },
  {
    id: 'check-code',
    phrase: 'Check your local code.',
    example: 'Grounding requirements can vary, so check your local code.',
    meaning: {
      en: 'Verify the electrical rules and approval requirements that apply in your area.',
      'zh-Hans': '核对当地适用的电气规范和审批要求。',
    },
    translation: '接地要求可能不同，所以要查看当地规范。',
  },
  {
    id: 'double-check',
    phrase: 'Always double-check your work.',
    example: 'Before the panel is energized, always double-check your work.',
    meaning: {
      en: 'Inspect your work one more time after you finish.',
      'zh-Hans': '完成后一定要再检查一遍。',
    },
    translation: '配电箱通电之前，一定要再次检查你的工作。',
  },
];

const categoryOrder = [
  'essential',
  'setup',
  'fastening',
  'cutting',
  'routing',
  'organizing',
  'connections',
  'grounding',
  'inspection',
  'safety',
  'communication',
];

const categoryLabels: Record<string, Record<Locale, string>> = {
  essential: {en: 'Essential phrases', 'zh-Hans': '核心必背'},
  setup: {en: 'Setup and positioning', 'zh-Hans': '安装与定位'},
  fastening: {en: 'Fastening', 'zh-Hans': '拧紧与固定'},
  cutting: {en: 'Cutting and stripping', 'zh-Hans': '切线、剥线与外皮处理'},
  routing: {en: 'Routing cable', 'zh-Hans': '穿线与布线'},
  organizing: {en: 'Organizing and labeling', 'zh-Hans': '整理与标记'},
  connections: {en: 'Connections and breakers', 'zh-Hans': '端子、接线与断路器'},
  grounding: {en: 'Grounding', 'zh-Hans': '接地'},
  inspection: {en: 'Inspection', 'zh-Hans': '检查与验收'},
  safety: {en: 'Safety and isolation', 'zh-Hans': '安全与隔离'},
  communication: {en: 'Jobsite communication', 'zh-Hans': '通用现场交流'},
};

const phrases: Phrase[] = [
  ...corePhrases.map((phrase) => ({...phrase, category: 'essential'})),
  ...actionPhrases.map((phrase) => ({
    category: phrase.category,
    example: phrase.example,
    id: phrase.id,
    meaning: {
      en: phrase.zh,
      'zh-Hans': phrase.zh,
    },
    phrase: phrase.phrase,
    timestamp: phrase.timestamp,
    translation: phrase.exampleZh,
  })),
];

type PhraseCardProps = {
  isMastered: boolean;
  locale: Locale;
  onMasteryChange: (id: string, value: boolean) => void;
  phrase: Phrase;
};

function PhraseCard({isMastered, locale, onMasteryChange, phrase}: PhraseCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isChinese = locale === 'zh-Hans';
  const detailsId = `phrase-details-${phrase.id}`;

  return (
    <section className={`${styles.card} ${isMastered ? styles.mastered : ''}`}>
      <div className={styles.cardHeader}>
        <label className={styles.checkLabel} title={isChinese ? '标记为已掌握' : 'Mark as mastered'}>
          <input
            checked={isMastered}
            onChange={(event) => onMasteryChange(phrase.id, event.target.checked)}
            type="checkbox"
          />
          <span className={styles.visuallyHidden}>{isChinese ? '已掌握' : 'Mastered'}</span>
        </label>
        <button
          aria-controls={detailsId}
          aria-expanded={isOpen}
          className={styles.toggle}
          onClick={() => setIsOpen((current) => !current)}
          type="button">
          <span className={styles.phrase}>{phrase.phrase}</span>
          {phrase.timestamp && <span className={styles.timestamp}>{phrase.timestamp}</span>}
          {isMastered && <span className={styles.masteredLabel}>{isChinese ? '已掌握' : 'Mastered'}</span>}
          <span aria-hidden="true" className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}>⌄</span>
        </button>
      </div>

      {isOpen && (
        <div className={styles.details} id={detailsId}>
          <p>
            <strong>{isChinese ? '意思：' : 'Meaning: '}</strong>
            {phrase.meaning[locale]}
          </p>
          <p>
            <strong>{isChinese ? '例句：' : 'Example: '}</strong>
            {phrase.example} <SpeakButton text={phrase.example} />
          </p>
          <p>
            <strong>{isChinese ? '中文：' : 'Chinese: '}</strong>
            {phrase.translation}
          </p>
        </div>
      )}
    </section>
  );
}

export default function PhraseDeck({locale}: {locale: Locale}) {
  const [mastered, setMastered] = useState<Set<string>>(new Set());
  const isChinese = locale === 'zh-Hans';

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setMastered(new Set(JSON.parse(saved) as string[]));
      }
    } catch {
      setMastered(new Set());
    }
  }, []);

  const updateMastery = (id: string, value: boolean) => {
    setMastered((current) => {
      const next = new Set(current);
      if (value) {
        next.add(id);
      } else {
        next.delete(id);
      }
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      return next;
    });
  };

  return (
    <div className={styles.deck}>
      <div className={styles.progress}>
        <span>{isChinese ? `已掌握 ${mastered.size} / ${phrases.length}` : `Mastered ${mastered.size} / ${phrases.length}`}</span>
        <progress aria-label={isChinese ? '学习进度' : 'Learning progress'} max={phrases.length} value={mastered.size} />
      </div>
      {categoryOrder.map((category) => {
        const categoryPhrases = phrases.filter((phrase) => phrase.category === category);
        if (categoryPhrases.length === 0) return null;

        return (
          <section className={styles.category} key={category}>
            <h3>{categoryLabels[category][locale]} <span>{categoryPhrases.length}</span></h3>
            <div className={styles.cards}>
              {categoryPhrases.map((phrase) => (
                <PhraseCard
                  isMastered={mastered.has(phrase.id)}
                  key={phrase.id}
                  locale={locale}
                  onMasteryChange={updateMastery}
                  phrase={phrase}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
