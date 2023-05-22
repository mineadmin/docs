import { defineClientConfig } from '@vuepress/client'
import ArcoVue from '@arco-design/web-vue'
import '@arco-design/web-vue/dist/arco.css'

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    app.use(ArcoVue, {})
  },
})