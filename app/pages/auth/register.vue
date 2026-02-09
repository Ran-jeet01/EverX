<template>
  <div class="register-page">
    <div class="header">
      <h1>Create Account</h1>
      <p>Join us today! It only takes a minute.</p>
    </div>

    <form @submit.prevent="handleRegister" class="auth-form">
      <div v-if="error" class="error-message">{{ error }}</div>
      <div class="form-group">
        <label for="name">Full Name</label>
        <div class="input-wrapper" :class="{ 'has-error': errors.name }">
          <input
            v-model="form.name"
            type="text"
            id="name"
            placeholder="John Doe"
            required
            @input="errors.name = ''"
          />
        </div>
        <span v-if="errors.name" class="field-error">{{ errors.name }}</span>
      </div>

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
        <label for="password">Password</label>
        <div class="input-wrapper" :class="{ 'has-error': errors.password }">
          <input
            v-model="form.password"
            type="password"
            id="password"
            placeholder="••••••••"
            required
            @input="errors.password = ''"
          />
        </div>
        <span v-if="errors.password" class="field-error">{{ errors.password }}</span>
      </div>

      <div class="form-group">
        <label for="address">Address</label>
        <div class="input-wrapper" :class="{ 'has-error': errors.address }">
          <input
            v-model="form.address"
            type="text"
            id="address"
            placeholder="Kathmnadu, Baneshwor"
            required
            @input="errors.address = ''"
          />
        </div>
        <span v-if="errors.address" class="field-error">{{ errors.address }}</span>
      </div>

      <div class="terms">
        <input type="checkbox" id="terms" required />
        <label for="terms"
          >I agree to the <a href="#">Terms & Conditions</a></label
        >
      </div>

      <button
        type="submit"
        class="submit-btn highlight-glow"
        :disabled="loading"
      >
        {{ loading ? "Creating Account..." : "Getting Started" }}
      </button>
    </form>

    <div class="footer-note">
      <p>
        Already have an account? <NuxtLink to="/auth/login">Login</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "auth",
});

import { registerSchema } from "~/schemas";

const { register } = useAuth();
const form = reactive({
  name: "",
  email: "",
  password: "",
  address: "",
});
const loading = ref(false);
const error = ref("");

const errors = reactive({
  name: "",
  email: "",
  password: "",
  address: ""
});

const handleRegister = async () => {
  loading.value = true;
  error.value = "";
  // Reset errors
  Object.keys(errors).forEach(key => errors[key as keyof typeof errors] = "");

  const result = registerSchema.safeParse(form);

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
    await register(form);
  } catch (e: any) {
    error.value = e.response?._data?.statusMessage || "Registration failed";
  } finally {
    loading.value = false;
  }
};
</script>

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

.terms {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 0.5rem 0;
}

.terms input {
  width: 16px;
  height: 16px;
  accent-color: var(--primary);
}

.terms label {
  font-size: 0.8rem;
}

.terms a {
  color: var(--primary);
}

.submit-btn {
  margin-top: 0.5rem;
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

.footer-note {
  margin-top: 2rem;
  text-align: center;
}

.footer-note p {
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.footer-note a {
  color: var(--primary);
  font-weight: 600;
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
