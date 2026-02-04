export default defineNuxtRouteMiddleware(async (to, from) => {
  const { user, initAuth } = useAuth();
  // Ensure auth state is initialized (client-side handling mostly)
  if (!user.value) {
    await initAuth();
  }

  // 1. If auth page, force 'auth' layout
  if (to.path.startsWith("/auth")) {
    to.meta.layout = "auth";
    return;
  }

  // 2. If not logged in, force 'default' layout (or whatever guest layout is)
  if (!user.value) {
    to.meta.layout = "default";
    return;
  }

  // 3. Logged in: Check role
  if (user.value.role === "admin") {
    to.meta.layout = "admin";
  } else {
    to.meta.layout = "user";
  }
});
