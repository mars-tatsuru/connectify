<script setup lang="ts">
  definePageMeta({
    layout: "custom",
  });

  // login and set userInfo to store
  const supabase = useSupabaseClient();
  await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
      redirectTo: "/",
    },
  });
</script>

<template>
  <div class="login"></div>
</template>

<style scoped lang="scss">
  .login {
    width: 100vw;
    height: 100vh;
    background-color: #f5f5f5;
  }
</style>
