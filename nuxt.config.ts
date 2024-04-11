// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // devtools: { enabled: true }
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/_colors.scss" as *;',
        },
      },
    },
  },
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
    },
    // animation of page transition
    // pageTransition: { name: "page", mode: "out-in" },
    // layoutTransition: { name: "layout", mode: "out-in" },
  },
  modules: ["nuxt-primevue"],
  primevue: {
    options: {
      unstyled: false,
    },
  },
  css: [
    "primevue/resources/themes/aura-light-green/theme.css",
    // icon
    "primeicons/primeicons.css",
  ],
  // role of rendering
  // routeRules: {
  //   // Generated at build time for SEO purpose
  //   "/": { prerender: true },
  //   // Cached for 1 hour
  //   "/api/*": { cache: { maxAge: 60 * 60 } },
  //   // Redirection to avoid 404
  //   "/old-page": {
  //     redirect: { to: "/new-page", statusCode: 302 },
  //   },
  // },
});
