import { defineUserConfig, defaultTheme } from 'vuepress'

export default defineUserConfig({
  lang: 'zh-CN',
  title: 'MineAdmin',
  base: '/',
  description: '基于Hyperf、Vue3和Element plus在高性能的基础上，快速构建你的web应用程序',

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
  ],

  theme: defaultTheme({
    logo: '/logo.svg',
    docsRepo: 'https://gitee.com/xmo/mineadmin-doc',
    docsBranch: 'master',
    docsDir: 'docs',
    editLinkPattern: ':repo/edit/:branch/:path',
    editLinkText: '点击参与文档的完善',
    lastUpdatedText: '最后更新时间',
    contributors: false,
    tip: '提示',
    warning: '警告',
    danger: '危险',

    navbar: [
      { text: '📖 指南', link: '/doc/guide/' },
      { text: '📖 进阶', link: '/doc/guide/' },
      { text: '📖 常见问题', link: '/doc/guide/' },
      { text: '📖 0.x版本文档', link: '/doc/guide/' },
      { text: '🎀 捐赠名单', link: '/donation/' },
      { text: '🔔 演示', link: 'https://demo.mineadmin.com' },
      {
        text: '💻 源码地址',
        children: [
          { text: '后端 Gitee', link: 'https://gitee.com/xmo/MineAdmin' },
          { text: '后端 Github', link: 'https://github.com/kanyxmo/MineAdmin' },
          { text: '前端 Gitee', link: 'https://gitee.com/xmo/MineAdmin-Vue' },
          { text: '前端 Github', link: 'https://github.com/kanyxmo/MineAdmin-Vie' }
        ]
      },
      {
        text: '📢 服务器推荐',
        children: [
          { text: '腾讯云特惠', link: 'http://txy.mineadmin.com' },
          { text: '阿里云特惠', link: 'http://aly.mineadmin.com' }
        ]
      },
    ],

    sidebarDepth: 3,
    sidebar: [
      {
        text: '开始',
        collapsible: false,
        children: [
          { text: '🏆 介绍', link: '/doc/guide/' },
          { text: '🏅 安装', link: '/doc/guide/install' },
          { text: '🪄 系统文件结构', link: '/doc/guide/structure' },
        ]
      },
    ],
  })

})