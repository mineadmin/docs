import { defineClientConfig } from '@vuepress/client'
import ArcoVue from '@arco-design/web-vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import '@arco-design/web-vue/dist/arco.css'

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    app.use(ArcoVue, {}).use(ArcoVueIcon)
  },
})