<script setup lang="ts"></script>

<template>
  <NuxtLayout>
    <Navbar />

    <NuxtPage />
  </NuxtLayout>
</template>

<style>
:root {
  --primary-color: #0f172a;
  --secondary-color: #334155;
  --accent-color: #6366f1;
  --accent-hover: #4f46e5;
  --background-color: #f8fafc;
  --surface-color: #ffffff;
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  --success-color: #10b981;
  --error-color: #ef4444;

  --gradient-main: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);

  --font-family: "Outfit", sans-serif;

  --container-width: 1280px;
  --header-height: 80px;

  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg:
    0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);

  --transition-fast: 0.2s ease;
  --transition-normal: 0.3s ease;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--font-family);
  background-color: var(--background-color);
  color: var(--text-primary);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

a {
  text-decoration: none;
  color: inherit;
}

ul {
  list-style: none;
}

button {
  cursor: pointer;
  border: none;
  outline: none;
  font-family: inherit;
}

img {
  max-width: 100%;
  display: block;
}

/* Utilities */
.container {
  max-width: var(--container-width);
  margin: 0 auto;
  padding: 0 1.5rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  border-radius: 99px;
  transition: all var(--transition-normal);
  gap: 0.5rem;
}

.btn-primary {
  background: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  background: var(--secondary-color);
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.btn-accent {
  background: var(--gradient-main);
  color: white;
}

.btn-accent:hover {
  filter: brightness(1.1);
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  color: var(--primary-color);
}

.section-subtitle {
  text-align: center;
  color: var(--text-secondary);
  font-size: 1.1rem;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.8s ease forwards;
}
</style>
