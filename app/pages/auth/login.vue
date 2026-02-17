<script setup lang="ts">
import { loginSchema } from "~/schemas";
definePageMeta({
  layout: "auth",
});

const { login } = useAuth();
const form = reactive({
  email: "",
  password: "",
});
const loading = ref(false);
const error = ref("");
const showPassword = ref(false);

const errors = reactive({
  email: "",
  password: ""
});

const handleLogin = async () => {
  loading.value = true;
  error.value = "";
  // Reset field errors
  errors.email = "";
  errors.password = "";

  const result = loginSchema.safeParse(form);

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
    await login(form);
  } catch (e: any) {
    error.value = e.response?._data?.statusMessage || "Login failed";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="login-page">
    <div class="header">
      <h1>Welcome Back</h1>
      <p>Enter your credentials to access your account</p>
    </div>

    <form @submit.prevent="handleLogin" class="auth-form">
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


      <div class="form-group">
        <div class="label-row">
          <label for="password">Password</label>
          <NuxtLink to="/auth/forgot-password" class="forgot-link">Forgot?</NuxtLink>
        </div>
        <div class="input-wrapper password-wrapper" :class="{ 'has-error': errors.password }">
          <input
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            id="password"
            placeholder="••••••••"
            required
            @input="errors.password = ''"
          />
          <button
            type="button"
            class="password-toggle"
            @click="showPassword = !showPassword"
            aria-label="Toggle password visibility"
          >
            <Icon :name="showPassword ? 'ri:eye-off-line' : 'ri:eye-line'" size="20" />
          </button>
        </div>
        <span v-if="errors.password" class="field-error">{{ errors.password }}</span>
      </div>


      <button
        type="submit"
        class="submit-btn highlight-glow"
        :disabled="loading"
      >
        {{ loading ? "Signing In..." : "Sign In" }}
      </button>
    </form>
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

.label-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

label {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-secondary);
}

.forgot-link {
  font-size: 0.8rem;
  color: var(--primary);
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

.password-wrapper {
  position: relative;
}

.password-wrapper input {
  padding-right: 45px;
}

.password-toggle {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  transition: color 0.2s;
}

.password-toggle:hover {
  color: var(--primary);
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
}

.submit-btn:hover {
  background: var(--primary-hover);
  transform: translateY(-1px);
}

.highlight-glow {
  position: relative;
  overflow: hidden;
}

.highlight-glow::after {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.1) 0%,
    transparent 60%
  );
  opacity: 0;
  transition: opacity 0.3s;
}

.highlight-glow:hover::after {
  opacity: 1;
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

.input-wrapper.has-error input:focus {
  box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1);
}

.field-error {
  color: #ef4444;
  font-size: 0.8rem;
  margin-top: 0.25rem;
}
</style>
