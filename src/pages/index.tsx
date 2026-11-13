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
    layoutTitle: 'Electrical and HVACR Course Notes',
    layoutDescription: 'Course notes for NCCER Core, Electrical Level 1, HVACR Level 1, and EPA 608, with supplementary videos and study references.',
    eyebrow: 'Classroom Learning and Review',
    title: 'Electrical and HVACR Course Notes',
    subtitle:
      'Study alongside your Electrical and HVACR classes with four textbook collections, module reviews, field trips, and supplementary YouTube lessons.',
    primaryAction: 'Start Learning',
    secondaryAction: 'Browse Videos',
    safetyTitle: 'Safety Boundary',
    safetyText:
      'These notes are for learning concepts and vocabulary. They do not replace the NEC, local code, licensing programs, PPE, lockout/tagout, equipment instructions, or qualified jobsite supervision.',
    paths: [
      {
        title: 'NCCER Core 6th Edition',
        description: 'Ten shared construction foundation modules.',
        href: '/docs/nccer-core',
      },
      {
        title: 'Electrical Level 1 — 12th Edition',
        description: 'Eleven modules and a module review; Chinese notes are available in both interfaces.',
        href: '/docs/electrical/level-1/26101-occupational-overview-the-electrical-industry',
      },
      {
        title: 'HVACR Level 1 — 6th Edition',
        description: 'Nine modules and a module review for heating, cooling, electricity, air distribution, and piping.',
        href: '/docs/hvacr/level-1/03101-introduction-to-hvacr',
      },
      {
        title: 'EPA 608 Preparatory Manual',
        description: 'Introduction, Core, Type I, Type II, and Type III study notes.',
        href: '/docs/hvacr/epa-608/introduction',
      },
      {
        title: 'Quick Start',
        description: 'Find your textbook and learn how to use the module notes and reviews.',
        href: '/docs/getting-started/quick-start',
      },
      {
        title: 'Field Trip',
        description: 'Review site observations and equipment photos.',
        href: '/docs/field-trip',
      },
      {
        title: 'YouTube Supplementary Learning',
        description: 'Browse supplementary video lessons by topic.',
        href: '/docs/video-index',
      },
      {
        title: 'YouTube Stage Quizzes',
        description: 'Six video-topic quizzes; these do not cover the four textbooks.',
        href: '/docs/quizzes/core-concepts',
      },
      {
        title: 'Learning Reference',
        description: 'Look up formulas and units; use the sidebar glossary for terminology.',
        href: '/docs/formula-reference',
      },
    ],
  },
  'zh-Hans': {
    layoutTitle: '电工与暖通制冷课程学习笔记',
    layoutDescription: '围绕 Core、Electrical、HVACR 和 EPA 608 四本教材整理的课程学习笔记。',
    eyebrow: '课堂学习 · 模块复习 · 实地考察',
    title: '电工与暖通制冷课程学习笔记',
    subtitle: '以 Core、Electrical、HVACR 和 EPA 608 四本教材为主线，配合模块复习、实地考察和 YouTube 补充学习，保留关键英文术语。',
    primaryAction: '开始学习',
    secondaryAction: '查看视频索引',
    safetyTitle: '安全边界',
    safetyText:
      '这套资料用于建立概念和术语体系，不能替代 NEC、当地规范（local code）、执照培训、PPE 或现场师傅监督。涉及带电测试、配电箱、240V/三相系统和故障排查时，先断电、验电，并确认你有资格操作。',
    paths: [
      {
        title: 'NCCER Core 第6版',
        description: '施工基础课程，包含安全、工具、施工图和职业技能等十个模块。',
        href: '/docs/nccer-core',
      },
      {
        title: 'Electrical Level 1 第12版',
        description: '已整理 11 个模块及模块复习，涵盖行业、安全、NEC、布线、电路和测试设备。',
        href: '/docs/electrical/level-1/26101-occupational-overview-the-electrical-industry',
      },
      {
        title: 'HVACR Level 1 第6版',
        description: '已整理九个模块及模块复习，涵盖供暖、制冷、电气、空气分配和管道。',
        href: '/docs/hvacr/level-1/03101-introduction-to-hvacr',
      },
      {
        title: 'EPA 608 备考手册',
        description: '包含考试介绍、Core、Type I、Type II 和 Type III，目录位于 HVACR 下。',
        href: '/docs/hvacr/epa-608/introduction',
      },
      {
        title: '入门指南',
        description: '了解四本教材的位置、用途，以及正文和模块复习的使用方法。',
        href: '/docs/getting-started/quick-start',
      },
      {
        title: 'Field Trip 实地考察',
        description: '浏览现场设备照片与考察记录。',
        href: '/docs/field-trip',
      },
      {
        title: 'YouTube 补充学习',
        description: '按主题查找视频笔记，补充课堂学习。',
        href: '/docs/video-index',
      },
      {
        title: 'YouTube 补充学习阶段测验',
        description: '六个视频主题的自测，不代表四本教材的章节测验。',
        href: '/docs/quizzes/core-concepts',
      },
      {
        title: '学习参考',
        description: '查阅公式和单位；术语可从侧栏的术语表查询。',
        href: '/docs/formula-reference',
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
