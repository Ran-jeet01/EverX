<script setup>
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

const handleLogin = async () => {
  loading.value = true;
  error.value = "";
  try {
    await login(form);
  } catch (e) {
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
        <div class="input-wrapper">
          <input
            v-model="form.email"
            type="email"
            id="email"
            placeholder="name@example.com"
            required
          />
        </div>
      </div>

      <div class="form-group">
        <div class="label-row">
          <label for="password">Password</label>
          <!-- <a href="#" class="forgot-link">Forgot?</a> -->
        </div>
        <div class="input-wrapper">
          <input
            v-model="form.password"
            type="password"
            id="password"
            placeholder="••••••••"
            required
          />
        </div>
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
</style>
