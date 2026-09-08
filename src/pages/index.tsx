import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

type HomeContent = {
  layoutTitle: string;
  layoutDescription: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryAction: string;
  secondaryAction: string;
  safetyTitle: string;
  safetyText: string;
  paths: {
    title: string;
    description: string;
    href: string;
  }[];
};

const contentByLocale: Record<string, HomeContent> = {
  en: {
    layoutTitle: 'Learn US Electrical Basics',
    layoutDescription: 'A practical learning path for US electrical basics, safety, tools, and key field vocabulary.',
    eyebrow: 'Electrical Engineering Basics',
    title: 'Learn US Electrical Basics',
    subtitle:
      'A searchable, beginner-friendly guide to circuits, residential wiring concepts, safety boundaries, tools, motors, transformers, and essential electrician vocabulary.',
    primaryAction: 'Start Learning',
    secondaryAction: 'Browse Videos',
    safetyTitle: 'Safety Boundary',
    safetyText:
      'These notes are for learning concepts and vocabulary. They do not replace the NEC, local code, licensing programs, PPE, lockout/tagout, equipment instructions, or qualified jobsite supervision.',
    paths: [
      {
        title: 'Quick Start',
        description: 'Begin with the learning route, study rhythm, and core mental models.',
        href: '/docs/getting-started/quick-start',
      },
      {
        title: 'US Residential Circuits',
        description: 'Understand 120/240V split phase, hot, neutral, ground, receptacles, and switches.',
        href: '/docs/us-residential/split-phase',
      },
      {
        title: 'Safety and Tools',
        description: 'Review breakers, GFCI, shock risk, multimeters, clamp meters, and safe verification habits.',
        href: '/docs/safety/electrical-safety',
      },
      {
        title: 'Stage Quizzes',
        description: 'Use 20-question checkpoints to test each learning stage.',
        href: '/docs/quizzes/core-concepts',
      },
      {
        title: 'Cheatsheet',
        description: 'Look up formulas, units, protection devices, circuit reminders, and measurement basics.',
        href: '/docs/formula-reference',
      },
      {
        title: 'Glossary',
        description: 'Search the English terms that appear in videos, field work, and exam prep.',
        href: '/docs/glossary',
      },
    ],
  },
  'zh-Hans': {
    layoutTitle: '美国电工基础学习路线',
    layoutDescription: '给中文学习者学习美国电工基础的双语文档。',
    eyebrow: '电工基础（Electrical Engineering Basics）',
    title: '美国电工基础学习路线',
    subtitle: '把 43 集视频整理成可导航、可搜索、可复习的学习系统，并保留关键英文术语。',
    primaryAction: '开始学习',
    secondaryAction: '查看视频索引',
    safetyTitle: '安全边界',
    safetyText:
      '这套资料用于建立概念和术语体系，不能替代 NEC、当地规范（local code）、执照培训、PPE 或现场师傅监督。涉及带电测试、配电箱、240V/三相系统和故障排查时，先断电、验电，并确认你有资格操作。',
    paths: [
      {
        title: '入门指南',
        description: '按熟悉的文档方式开始：路线、学习节奏、核心类比。',
        href: '/docs/getting-started/quick-start',
      },
      {
        title: '美国住宅电路',
        description: '理解美国住宅 120/240V、火线（hot）、零线（neutral）、地线（ground）、插座和开关。',
        href: '/docs/us-residential/split-phase',
      },
      {
        title: '安全与工具',
        description: '先学断路器（breaker）、漏电保护（GFCI）、火线碰地（hot-to-ground）、万用表和钳形表的边界。',
        href: '/docs/safety/electrical-safety',
      },
      {
        title: '阶段测验',
        description: '每个学习阶段 20 题，提交后显示解释和相关文档链接。',
        href: '/docs/quizzes/core-concepts',
      },
      {
        title: '速查表',
        description: '集中查看公式、单位、保护装置、电路概念和测量工具提醒。',
        href: '/docs/formula-reference',
      },
      {
        title: '术语表',
        description: '把现场、考试和视频里的英文术语变成可查询的中文术语索引。',
        href: '/docs/glossary',
      },
    ],
  },
};

const defaultContent = contentByLocale.en;

export default function Home(): ReactNode {
  const {
    i18n: {currentLocale},
  } = useDocusaurusContext();
  const content = contentByLocale[currentLocale] ?? defaultContent;

  return (
    <Layout title={content.layoutTitle} description={content.layoutDescription}>
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className="container">
            <p className={styles.eyebrow}>{content.eyebrow}</p>
            <Heading as="h1" className={styles.title}>
              {content.title}
            </Heading>
            <p className={styles.subtitle}>{content.subtitle}</p>
            <div className={styles.actions}>
              <Link className="button button--primary button--lg" to="/docs/">
                {content.primaryAction}
              </Link>
              <Link className="button button--secondary button--lg" to="/docs/video-index">
                {content.secondaryAction}
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <div className={styles.grid}>
              {content.paths.map((item) => (
                <Link className={styles.card} to={item.href} key={item.title}>
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.safety}>
          <div className="container">
            <Heading as="h2">{content.safetyTitle}</Heading>
            <p>{content.safetyText}</p>
          </div>
        </section>
      </main>
    </Layout>
  );
}
