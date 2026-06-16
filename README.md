# bj-hospital-vis

> 北京社保定点医院-可视化

## Links

- GitHub https://github.com/magicdawn/bj-hospital-vis

## 数据来源

- 北京行政区 & 医院地理位置来源: amap.com
- 医院列表: http://ybj.beijing.gov.cn/ddyy/ddyy/list?search_LIKE_yymc=&page=1&sortType=
- 19 家无需医保定点医院列表: http://bj.bendibao.com/bjsi/201387/112815.shtm

## Tech Stack

- Svelte 5
- Vite
- MapLibre GL JS（地图，无需 token）
- Biome (lint & format)
- Bun
- GitHub Pages (部署)

## 开发

```bash
# 安装依赖
bun install

# 启动开发服务器
bun dev

# 构建
bun run build

# 代码检查
bun run lint

# 代码格式化
bun run format
```

## 部署

通过 GitHub Actions 自动部署到 GitHub Pages（orphan 分支 `gh-pages`）。

**触发条件**：推送到 `master` 分支即自动构建并部署。

工作流（`.github/workflows/deploy.yml`）会：
1. 安装依赖、构建（base URL 自动设为 `/<repo-name>/`）
2. 在 `dist/` 中初始化 orphan 分支 `gh-pages` 并 force push

**首次使用需在仓库设置中开启 Pages**：
Settings → Pages → Source 选择 `gh-pages` 分支 / `(root)`。

部署地址：`https://<owner>.github.io/<repo-name>/`

## 项目结构

```
src/
├── main.js                 # 入口文件
├── App.svelte              # 根组件
├── lib/
│   ├── components/         # Svelte 组件
│   │   ├── Header.svelte
│   │   ├── Map.svelte
│   │   ├── Panel.svelte
│   │   └── FilterForm.svelte
│   ├── stores/             # Svelte stores
│   │   ├── hospitals.js
│   │   ├── districts.js
│   │   └── filters.js
│   └── utils/              # 工具函数
│       ├── geo.js
│       ├── request.js
│       └── constants.js
├── public/
│   └── data/               # 静态数据文件
└── styles/
    └── global.css          # 全局样式
```

## License

ISC
