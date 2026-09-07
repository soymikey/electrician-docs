import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

const paths = [
  {
    title: 'Getting Started',
    description: '按前端工程师熟悉的 docs 方式开始：路线、学习节奏、核心类比。',
    href: '/docs/getting-started/quick-start',
  },
  {
    title: 'US Residential',
    description: '理解美国住宅 120/240V、hot、neutral、ground、插座和开关。',
    href: '/docs/us-residential/split-phase',
  },
  {
    title: 'Safety & Tools',
    description: '先学 breaker、GFCI、hot-to-ground、万用表和钳形表的边界。',
    href: '/docs/safety/electrical-safety',
  },
  {
    title: 'Quizzes',
    description: '每个学习阶段 20 题，提交后显示解释和相关文档链接。',
    href: '/docs/quizzes/core-concepts',
  },
  {
    title: 'Glossary',
    description: '把现场、考试和视频里的英文术语变成可查询的 API reference。',
    href: '/docs/glossary',
  },
];

export default function Home(): ReactNode {
  return (
    <Layout
      title="美国电工学习文档"
      description="Electrical Engineering Basics docs for a frontend developer learning US electrical work">
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className="container">
            <p className={styles.eyebrow}>Electrical Engineering Basics</p>
            <Heading as="h1" className={styles.title}>
              像学 npm 包一样学美国电工
            </Heading>
            <p className={styles.subtitle}>
              把 43 集视频整理成可导航、可搜索、可复习的 docs-as-code 学习系统。
            </p>
            <div className={styles.actions}>
              <Link className="button button--primary button--lg" to="/docs/">
                开始学习
              </Link>
              <Link className="button button--secondary button--lg" to="/docs/video-index">
                查看视频索引
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <div className={styles.grid}>
              {paths.map((item) => (
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
            <Heading as="h2">安全边界</Heading>
            <p>
              这套资料用于建立概念和术语体系，不能替代 NEC、当地 code、执照培训、
              PPE 或现场师傅监督。涉及带电测试、配电箱、240V/三相系统和故障排查时，
              先断电、验电，并确认你有资格操作。
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
}
