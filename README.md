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
- Mapbox GL JS
- Biome (lint & format)
- Bun
- Cloudflare Pages (部署)

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

使用 Cloudflare Pages 部署：

```bash
# 构建
bun run build

# 使用 Wrangler 部署
bunx wrangler pages deploy dist
```

或者连接 GitHub 仓库，设置：
- Build command: `bun run build`
- Build output directory: `dist`

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
