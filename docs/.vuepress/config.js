module.exports = {
  title: 'MineAdmin',
  description: '快速构建你的web应用程序',
  // theme: 'reco',
  markdown: {
    lineNumbers: true,
  },
  themeConfig: {
    logo: '/logo.svg',
    

    head: [
      ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
    ],

    nav: [
      { text: '文档', link: '/doc/' },
      { text: '演示', link: 'https://demo.mineadmin.com' },
      { text: 'Gitee', link: 'https://gitee.com/xmo/MineAdmin' },
    ],

    sidebar: {
      "/doc/": [
        '/doc/',
        '/doc/install',
        '/doc/start',
        '/doc/files',
        '/doc/houtai',
        '/doc/qiantai',
      ],
      sidebarDepth: 3,
    },

  },
}