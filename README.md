# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Installation

```bash
npm install
```

**Note**: feel free to use the package manager of your choice.

## Local Development

```bash
npm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

Using SSH:

```bash
USE_SSH=true npm run deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> npm run deploy
```

If you are using GitHub Pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

## Field Trip 实地参观

- 栏目入口：`/docs/field-trip`（中文：`/zh-Hans/docs/field-trip`）。
- 首次记录：政府建筑 HVACR 与配电室，A–F 六个现场分组共 30 张照片，另保留 5 张待分组照片。
- 页面内容：`docs/field-trip/`，中文内容：`i18n/zh-Hans/docusaurus-plugin-content-docs/current/field-trip/`。
- 网页图片：`static/img/field-trip/government-building/`；原始整理索引在上一级目录的 `field-trip/government-building/`。

本地查看完整中英文版本：

```bash
npm run build
npm run serve -- --host 127.0.0.1 --port 3002
```

打开 <http://127.0.0.1:3002/zh-Hans/docs/field-trip>。修改文档时可用 `npm run start -- --locale zh-Hans --port 3002` 启动自动更新的中文开发预览。
