<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Login from "@/components/login.vue";

export default {
  name: "App",
  components: {
    Login,
  },
};
</script>

<style></style>
