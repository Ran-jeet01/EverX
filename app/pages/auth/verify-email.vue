<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

definePageMeta({
  layout: "auth",
  auth: {
    unauthenticatedOnly: false,
  }
});

const route = useRoute();
const router = useRouter();
const token = route.query.token as string;

const loading = ref(true);
const error = ref("");
const message = ref("");

onMounted(async () => {
  if (!token) {
    error.value = "Invalid verification link. Please check your email.";
    loading.value = false;
    return;
  }

  try {
    const response = await $fetch<{ message: string }>("/api/auth/verify-email", {
      method: "POST",
      body: { token },
    });
    message.value = response.message;
    // Redirect after 3 seconds
    setTimeout(() => {
      router.push("/auth/login");
    }, 3000);
  } catch (e: any) {
    error.value = e.response?._data?.statusMessage || "Verification failed. Please try again.";
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="login-page">
    <div class="header">
      <h1>Email Verification</h1>
      <p v-if="loading">Processing...</p>
    </div>

    <div class="auth-box">
      <div v-if="loading" class="status-message loading">
        <Icon name="eos-icons:loading" size="48" class="animate-spin text-primary" />
        <p>Verifying your email address...</p>
      </div>

      <div v-else-if="error" class="status-message error">
        <Icon name="ri:error-warning-fill" size="48" class="text-error" />
        <p>{{ error }}</p>
        <NuxtLink to="/auth/login" class="action-link">Back to Login</NuxtLink>
      </div>

      <div v-else class="status-message success">
        <Icon name="ri:checkbox-circle-fill" size="48" class="text-success" />
        <p>{{ message }}</p>
        <p class="redirect-text">Redirecting to login...</p>
        <NuxtLink to="/auth/login" class="action-link">Go to Login Now</NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header {
  margin-bottom: 2rem;
  text-align: center;
}

.header h1 {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.header p {
  color: var(--text-secondary);
  font-size: 0.95rem;
}

.auth-box {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  text-align: center;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.status-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  animation: fadeIn 0.5s ease;
}

.status-message p {
  color: var(--text-secondary);
  font-size: 1.1rem;
}

.redirect-text {
  font-size: 0.9rem;
  color: var(--text-secondary);
  opacity: 0.8;
}

.action-link {
  margin-top: 1rem;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: var(--primary);
  color: white;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s;
}

.action-link:hover {
  background-color: var(--primary-hover);
}

.text-error {
  color: #ef4444;
}

.text-success {
  color: #10b981;
}

.text-primary {
  color: var(--primary);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
