import {themes as prismThemes} from 'prism-react-renderer';
import rehypeKatex from 'rehype-katex';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Electrician Docs',
  tagline: 'Course notes for Electrical, HVACR, NCCER Core, and EPA 608',
  favicon: 'img/favicon.svg',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'local-learning',
  projectName: 'electrician-docs',

  onBrokenLinks: 'throw',
  clientModules: [require.resolve('./src/clientModules/firebaseAnalytics.ts')],
  scripts: [
    {
      src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3534156575856999',
      async: true,
      crossorigin: 'anonymous',
    },
  ],

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-Hans'],
    localeConfigs: {
      en: {
        label: 'English',
        htmlLang: 'en-US',
      },
      'zh-Hans': {
        label: '中文',
        htmlLang: 'zh-Hans',
      },
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          rehypePlugins: [rehypeKatex],
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        indexDocs: true,
        indexBlog: false,
        indexPages: true,
        docsRouteBasePath: '/docs',
        language: ['en', 'zh'],
        hashed: true,
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        searchResultLimits: 10,
        searchResultContextMaxLength: 120,
        searchBarPosition: 'right',
      },
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Electrical & HVACR',
      logo: {
        alt: 'Electrician Docs Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          label: 'Textbooks',
          position: 'left',
          items: [
            {to: '/docs/nccer-core', label: 'NCCER Core 6th Edition'},
            {to: '/docs/electrical/level-1/26101-occupational-overview-the-electrical-industry', label: 'Electrical Level 1'},
            {to: '/docs/hvacr/level-1/03101-introduction-to-hvacr', label: 'HVACR Level 1'},
            {to: '/docs/hvacr/epa-608/introduction', label: 'EPA 608'},
          ],
        },
        {to: '/docs/field-trip', label: 'Field Trip', position: 'left'},
        {
          label: 'Supplementary Learning',
          position: 'left',
          items: [
            {to: '/docs/video-index', label: 'Video Index'},
            {to: '/docs/quizzes/core-concepts', label: 'YouTube Stage Quizzes'},
            {to: '/docs/spoken-english/main-panel-phrases', label: 'Jobsite English'},
            {
              href: 'https://www.youtube.com/playlist?list=PLWv9VM947MKi_7yJ0_FCfzTBXpQU-Qd3K',
              label: 'YouTube Playlist',
            },
          ],
        },
        {
          label: 'Learning Reference',
          position: 'left',
          items: [
            {to: '/docs/nccer-core/glossary', label: 'Core Glossary'},
            {to: '/docs/electrical/level-1/glossary', label: 'Electrical Glossary'},
            {to: '/docs/hvacr/level-1/glossary', label: 'HVACR Glossary'},
            {to: '/docs/glossary', label: 'Basic Glossary'},
            {to: '/docs/formula-reference', label: 'Formula Reference'},
          ],
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Quick Start',
              to: '/docs/getting-started/quick-start',
            },
            {
              label: 'Safety',
              to: '/docs/safety/electrical-safety',
            },
            {
              label: 'Glossary',
              to: '/docs/glossary',
            },
            {
              label: 'Cheatsheet',
              to: '/docs/formula-reference',
            },
          ],
        },
        {
          title: 'Reference',
          items: [
            {
              label: 'Video Index',
              to: '/docs/video-index',
            },
            {
              label: 'Original Playlist',
              href: 'https://www.youtube.com/playlist?list=PLWv9VM947MKi_7yJ0_FCfzTBXpQU-Qd3K',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Built with Docusaurus',
              href: 'https://docusaurus.io/',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Personal learning docs. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
