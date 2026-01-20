<template>
  <div class="auth-layout">
    <NavPublicNavbar />

    <main class="auth-main">
      <div class="auth-card-container fade-in">
        <div class="switcher-wrapper glass-panel">
          <NuxtLink
            to="/auth/login"
            class="switch-btn"
            :class="{ active: route.path === '/auth/login' }"
          >
            Login
          </NuxtLink>
          <NuxtLink
            to="/auth/register"
            class="switch-btn"
            :class="{ active: route.path === '/auth/register' }"
          >
            Register
          </NuxtLink>
        </div>

        <div class="auth-content-box glass-panel">
          <slot />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
const route = useRoute();
</script>

<style scoped>
.auth-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #e0e7ff 0%, #f8f9fb 50%, #fef3f2 100%);
}

.auth-main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 100px;
  padding-bottom: 40px;
}

.auth-card-container {
  width: 100%;
  max-width: 450px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 0 1.5rem;
}

.switcher-wrapper {
  display: flex;
  padding: 6px;
  border-radius: 12px;
  background: #f1f5f9;
}

.switch-btn {
  flex: 1;
  text-align: center;
  padding: 10px;
  font-size: 0.95rem;
  font-weight: 600;
  border-radius: 8px;
  color: var(--text-secondary);
  transition: var(--transition);
}

.switch-btn.active {
  background: var(--primary);
  color: white;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.switch-btn:not(.active):hover {
  color: var(--text-primary);
  background: rgba(0, 0, 0, 0.03);
}

.auth-content-box {
  padding: 2.5rem;
  border-radius: 20px;
  animation: slideIn 0.4s ease-out;
}
</style>
