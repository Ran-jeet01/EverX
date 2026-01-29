<script setup lang="ts">
console.log("User layout");
</script>

<template>
  <ClientOnly>
    <NavUserNavbar />
  </ClientOnly>
  <ToastContainer />
  <slot />
</template>
