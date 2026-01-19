<script lang="ts">
import PublicNavbar from "~/components/nav/PublicNavbar.vue";
import AdminNavbar from "~/components/nav/AdminNavbar.vue";
import UserNavbar from "~/components/nav/UserNavbar.vue";
const { isAdmin, isLoggedIn } = useAuth();
</script>
<template>
  <!-- <AdminNavbar v-if="isAdmin" />
  <UserNavbar v-else-if="isLoggedIn" />
  <PublicNavbar v-else /> -->

  <ClientOnly>
    <AdminNavbar v-if="isAdmin" />
    <UserNavbar v-else-if="isLoggedIn" />
    <PublicNavbar v-else />
  </ClientOnly>

  <slot />
</template>
