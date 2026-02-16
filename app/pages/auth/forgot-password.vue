<script setup lang="ts">
import { forgotPasswordSchema } from "~/schemas";

definePageMeta({
  layout: "auth",
});

const form = reactive({
  email: "",
});
const loading = ref(false);
const message = ref("");
const error = ref("");

const errors = reactive({
  email: "",
});

const handleForgotPassword = async () => {
  loading.value = true;
  error.value = "";
  message.value = "";
  errors.email = "";

  const result = forgotPasswordSchema.safeParse(form);

  if (!result.success) {
    loading.value = false;
    result.error.issues.forEach((issue) => {
      const field = issue.path[0];
      if (field && typeof field === 'string' && field in errors) {
        errors[field as keyof typeof errors] = issue.message;
      }
    });
    return;
  }

  try {
    const response = await $fetch<{ message: string }>("/api/auth/forgot-password", {
      method: "POST",
      body: form,
    });
    message.value = response.message;
  } catch (e: any) {
    error.value = e.response?._data?.statusMessage || "Something went wrong";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="forgot-password-page">
    <div class="header">
      <h1>Forgot Password?</h1>
      <p>Enter your email and we'll send you a link to reset your password.</p>
    </div>

    <form @submit.prevent="handleForgotPassword" class="auth-form" v-if="!message">
      <div v-if="error" class="error-message">{{ error }}</div>
      
      <div class="form-group">
        <label for="email">Email Address</label>
        <div class="input-wrapper" :class="{ 'has-error': errors.email }">
          <input
            v-model="form.email"
            type="email"
            id="email"
            placeholder="name@example.com"
            required
            @input="errors.email = ''"
          />
        </div>
        <span v-if="errors.email" class="field-error">{{ errors.email }}</span>
      </div>

      <button
        type="submit"
        class="submit-btn highlight-glow"
        :disabled="loading"
      >
        {{ loading ? "Sending..." : "Send Reset Link" }}
      </button>

      <div class="footer-links">
        <NuxtLink to="/auth/login" class="back-link">Back to Login</NuxtLink>
      </div>
    </form>

    <div v-else class="success-container">
      <div class="success-icon">✓</div>
      <p class="success-message">{{ message }}</p>
      <NuxtLink to="/auth/login" class="submit-btn text-center">Back to Login</NuxtLink>
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

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-secondary);
}

.input-wrapper input {
  width: 100%;
  padding: 12px 16px;
  border-radius: 10px;
  background: #ffffff;
  border: 1px solid var(--border);
  color: var(--text-primary);
  font-size: 0.95rem;
  transition: var(--transition);
}

.input-wrapper input:focus {
  border-color: var(--primary);
  background: #ffffff;
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
}

.submit-btn {
  margin-top: 1rem;
  padding: 14px;
  border-radius: 10px;
  background: var(--primary);
  color: white;
  font-weight: 700;
  font-size: 1rem;
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
  display: block;
  text-decoration: none;
}

.submit-btn:hover {
  background: var(--primary-hover);
  transform: translateY(-1px);
}

.text-center {
  text-align: center;
}

.footer-links {
  margin-top: 1.5rem;
  text-align: center;
}

.back-link {
  font-size: 0.9rem;
  color: var(--primary);
  text-decoration: none;
  font-weight: 500;
}

.back-link:hover {
  text-decoration: underline;
}

.error-message {
  color: #ef4444;
  background-color: #fef2f2;
  padding: 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.9em;
  text-align: center;
  border: 1px solid #fecaca;
}

.input-wrapper.has-error input {
  border-color: #ef4444;
}

.field-error {
  color: #ef4444;
  font-size: 0.8rem;
  margin-top: 0.25rem;
}

.success-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem;
}

.success-icon {
  width: 60px;
  height: 60px;
  background-color: #10b981;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  box-shadow: 0 4px 10px rgba(16, 185, 129, 0.3);
}

.success-message {
  color: var(--text-primary);
  text-align: center;
  font-weight: 500;
}
</style>
