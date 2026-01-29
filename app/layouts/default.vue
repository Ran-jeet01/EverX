<!-- <script lang="ts" setup>
const isAdminn = true;
const isLoggedInn = false;
console.log("default");
console.log(isAdminn);
console.log(isLoggedInn);
</script>
<template>
  <ClientOnly>
    <NavAdminNavbar v-if="isAdminn" />
    <NavUserNavbar v-else-if="isLoggedInn" />
    <NavPublicNavbar v-else />
  </ClientOnly>
  <slot />
</template>
 -->
<template>
  <ClientOnly> <NavPublicNavbar /> </ClientOnly>
  <ToastContainer />
  <slot />
</template>
