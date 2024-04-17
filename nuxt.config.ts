// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // devtools: { enabled: true }
  // set ssr to disabled for supabase login
  ssr: false,
  // routeRules: {
  //   "/": { prerender: true },
  // },
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
      title: "Connectify",
      meta: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          charset: "utf-8",
        },
      ],
      link: [],
      style: [],
      script: [],
      noscript: [],
    },
  },
  // https://icones.js.org/
  modules: [
    "nuxt-primevue",
    "@pinia/nuxt",
    "nuxt-icon",
    "@nuxtjs/supabase",
    "@nuxt/image",
  ],
  primevue: {
    options: {
      unstyled: false,
    },
  },
  css: [
    "primevue/resources/themes/aura-light-green/theme.css",
    // icon
    "primeicons/primeicons.css",
    // global css
    "./assets/scss/main.scss",
    "~/assets/scss/animation.scss",
  ],
  runtimeConfig: {
    secret: {
      microcms: {
        domain: "oly7867sh3",
        api: {
          key: "3DdYSx2xto331BSkoxSSWq4OkpGqkamqXj87",
        },
      },
    },
    public: {
      microcms: {
        domain: "",
        api: {
          key: "",
        },
      },
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_KEY: process.env.SUPABASE_KEY,
    },
  },
  supabase: {
    url: process.env.NUXT_PUBLIC_SUPABASE_URL,
    key: process.env.NUXT_SECRET_SUPABASE_KEY,
    redirectOptions: {
      login: "/login",
      callback: "",
      exclude: [],
    },
    cookieOptions: {
      maxAge: 60 * 60 * 8,
      sameSite: "lax",
      secure: true,
    },
  },
});
