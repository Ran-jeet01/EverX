export default defineNuxtRouteMiddleware(() => {
  const auth = useAuth();
  if (!auth.isLoggedIn) {
    return navigateTo("/auth/login");
  }
});
