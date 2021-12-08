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
      { text: '文档', link: '/doc/' },
      { text: '捐赠列表', link: '/donation'},
      { text: '演示', link: 'https://demo.mineadmin.com' },
      { text: 'Gitee', link: 'https://gitee.com/xmo/MineAdmin' },
    ],

    sidebarDepth: 1,
    sidebar: {
      "/guide/": [
        {
          title: '开始',
          collapsable: false,
					children: [
						['/guide/', '介绍'],
						['/guide/', '路由'],
						['/guide/style', '布局样式'],
						['/guide/server', '和服务端进行交互'],
						['/guide/newPage', '第一个页面'],
						['/guide/build', '构建与部署']
					]
        }
      ],

      "/doc/": [
        '/doc/',
        '/doc/install',
        '/doc/start',
        '/doc/houtai',
        '/doc/qiantai',
        '/doc/wenti',
      ],
      sidebarDepth: 3,
    },

  },
}