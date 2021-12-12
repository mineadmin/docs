module.exports = {
  title: 'MineAdmin',
  base: '/',
  description: '快速构建你的web应用程序',

  markdown: {
    lineNumbers: true,
  },
  themeConfig: {
    logo: '/logo.svg',
    
    head: [
      ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
    ],

    nav: [
      { text: '📖 文档', link: '/doc/guide/' },
      { text: '🎀 捐赠名单', link: '/donation/'},
      { text: '🔔 演示', link: 'https://demo.mineadmin.com' },
      { text: '💻 Gitee', link: 'https://gitee.com/xmo/MineAdmin' },
      { 
        text: '📢 服务器推荐',
        items: [
          {text: '腾讯云特惠', link: 'http://txy.mineadmin.com'},
          {text: '阿里云特惠', link: 'http://aly.mineadmin.com'}
        ]
      },
    ],

    sidebarDepth: 3,
    sidebar: {
      "/doc/": [
        {
          title: '开始',
          collapsable: false,
					children: [
						['/doc/guide/', '😉 介绍'],
						['/doc/guide/install', '😘 安装'],
						['/doc/guide/structure', '😋 系统文件结构'],
					]
        },
        {
          title: '后端文档',
          collapsable: false,
					children: [
						['/doc/houtai/', '🤟 开发规范'],
						['/doc/houtai/zhujie.md', '👏 系统注解'],
						['/doc/houtai/event.md', '🎊 系统事件（钩子）'],
					]
        },
        {
          title: '前端文档',
          collapsable: false,
					children: [
						['/doc/qiantai/', '😉 开发规范'],
					]
        },
        {
          title: '其他',
          collapsable: false,
					children: [
						['/doc/other/wenti.md', '📌 常见问题'],
						['/doc/other/video.md', '🎥 视频教程'],
						['/doc/other/changelog.md', '👍 版本更新记录'],
					]
        }
      ]
    },

  },
}