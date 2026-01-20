<script setup lang="ts">
import UserNavbar from "~/components/nav/UserNavbar.vue";
console.log("User layout");
</script>

<template>
  <UserNavbar />
  <slot />
  <p>User.vue</p>
</template>
