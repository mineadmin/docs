import { defineUserConfig, defaultTheme } from 'vuepress'
import { searchPlugin } from '@vuepress/plugin-search'
import MarkdownIt from 'markdown-it'
import { tocPlugin } from '@mdit-vue/plugin-toc'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { getDirname, path } from '@vuepress/utils'

const __dirname = getDirname(import.meta.url)

export default defineUserConfig({
  lang: 'zh-CN',
  title: 'MineAdmin',
  base: '/',
  description: '基于Hyperf、Vue3、Vite3和Arco Design在高性能的基础上，快速构建你的web应用程序',

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
  ],

  plugins: [
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './components'),
    }),
    searchPlugin({
      // 配置项
    }),
    MarkdownIt({ html: true }).use(tocPlugin, {
      // options
    })
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
      { text: '🧭 指南', link: '/guide/' },
      { text: '🚀 进阶', link: '/further/' },
      { text: '📖 常见问题', link: '/faqs/' },
      { text: '💎 付费支持', link: '/support/' },
      {
        text: '💻 源码仓库',
        children: [
          { text: '后端 Gitee', link: 'https://gitee.com/xmo/MineAdmin' },
          { text: '后端 Github', link: 'https://github.com/kanyxmo/MineAdmin' },
          { text: '前端 Gitee', link: 'https://gitee.com/xmo/MineAdmin-Vue' },
          { text: '前端 Github', link: 'https://github.com/kanyxmo/MineAdmin-Vue' }
        ]
      },
      {
        text: '🎉 老版本文档',
        children: [
          { text: '1.4.x', link: '/1.4.x/' },
          { text: '0.7.x', link: '/0.7.x/' },
        ]
      },
      {
        text: '📢 更多',
        children: [
          { text: '更新记录', link: '/change/' },
          { text: '捐赠名单', link: '/donation/' },
          { text: '查看演示', link: 'https://demo.mineadmin.com' },
          { text: '腾讯云特惠', link: 'http://txy.mineadmin.com' },
          { text: '阿里云特惠', link: 'http://aly.mineadmin.com' }
        ]
      },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '开始',
          collapsible: false,
          children: [
            '/guide/README.md',
            '/guide/start/declaration.md',
            '/guide/start/copyright.md',
            '/guide/start/document.md',
            '/guide/start/thank.md',
          ]
        },
        {
          text: '安装',
          collapsible: false,
          children: [
            '/guide/install/README.md',
            '/guide/install/advanced.md',
            '/guide/install/structure.md',
          ]
        },
        {
          text: '其他',
          collapsible: false,
          children: [
            '/guide/other/README.md',
            '/guide/other/code.md',
            '/guide/other/version.md',
            '/guide/other/plan.md',
            '/guide/other/update.md',
          ]
        },
      ],
      '/further/': [
        {
          text: '进阶起步',
          collapsible: false,
          children: [
            '/further/README.md',
            '/further/mustLearn/module.md',
            '/further/mustLearn/menu.md',
            '/further/mustLearn/db.md',
            '/further/mustLearn/codeGenerator.md',
            '/further/mustLearn/i18n.md',
            '/further/mustLearn/upload.md',
            '/further/mustLearn/appAndApi.md',
            '/further/mustLearn/userinfo.md',
            '/further/mustLearn/changeCore.md',
          ]
        },
        {
          text: '前端专区',
          collapsible: false,
          children: [
            '/further/front/route.md',
            '/further/front/request.md',
            '/further/front/store.md',
            '/further/front/crudComponent.md',
            '/further/front/formComponent.md',
            '/further/front/component.md',
            '/further/front/utils.md',
            '/further/front/directives.md',
            '/further/front/skin.md',
            '/further/front/setup.md',
          ]
        },
        {
          text: '后端专区',
          collapsible: false,
          children: [
            '/further/backend/schema.md',
            '/further/backend/annotation.md',
            '/further/backend/command.md',
            '/further/backend/dataScope.md',
            '/further/backend/crontab.md',
            '/further/backend/importAndExport.md',
            '/further/backend/login.md',
            '/further/backend/event.md',
            '/further/backend/funs.md',
          ]
        },
      ],
      '/faqs/': [''],
      '/support/': [''],
      '/change/': ['']
    }
  })

})