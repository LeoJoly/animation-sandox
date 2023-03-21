// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  components: [
    {
      path: '~/components/',
      pathPrefix: false
    }
  ],

  css: [
    '@/styles/main.scss'
  ],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "@/styles/_plugins/_mq.scss";
            @import "@/styles/_config/_font-styles.scss";
            @import "@/styles/_config/_mixins.scss";
            @import "@/styles/_config/_variables.scss";
          `
        }
      }
    }
  }
})
