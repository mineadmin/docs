module.exports = {
  title: 'MineAdmin',
  description: '快速构建你的web应用程序',
  // theme: 'reco',
  themeConfig: {
    logo: '/logo.svg',
    // 侧边栏配置
    sidebar: 'auto',

    head: [
      ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
    ],

    nav: [
      { text: '文档', link: '/mineadmin/' },
      { text: '演示', link: 'https://demo.mineadmin.com' },
      { text: 'Gitee', link: 'https://gitee.com/xmo/MineAdmin' },
    ],

  },

  markdown: {
    lineNumbers: true,
  }
}