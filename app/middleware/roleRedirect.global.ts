export default defineNuxtRouteMiddleware((to) => {
  const { isLoggedIn, isAdmin } = useAuth();

  console.log("middleware");
  console.log(isLoggedIn.value, "islogin");
  console.log(isAdmin.value, "isadmin");

  // Guest user
  if (!isLoggedIn.value) {
    if (to.path.startsWith("/admin") || to.path.startsWith("/cart")) {
      return navigateTo("/");
    }
    return;
  }

  // Admin user
  if (isAdmin.value) {
    if (!to.path.startsWith("/admin")) {
      return navigateTo("/admin");
    }
    return;
  }

  // Normal logged-in user
  if (!isAdmin.value) {
    if (to.path.startsWith("/admin") || to.path.startsWith("/login")) {
      return navigateTo("/");
    }
  }
});
