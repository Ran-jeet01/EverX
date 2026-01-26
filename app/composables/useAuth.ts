// // import type { User } from "~/server/db/schema"; // We assume the type is exported or we define a partial
// // If User type is not exported or complex, we can define a local interface
// interface UserState {
//   id: number;
//   email: string;
//   name: string | null;
// }

// export const useAuth = () => {
//   const user = useState<UserState | null>("user", () => null);
//   const router = useRouter(); // Use Nuxt router

//   const login = async (credentials: any) => {
//     try {
//       const data = await $fetch("/api/auth/login", {
//         method: "POST",
//         body: credentials,
//       });
//       user.value = data as UserState;

//       // Store in cookie for persistence (frontend-side cookie for simple state rehydration)
//       // Note: The proper way is HttpOnly cookie from server, which we did partially,
//       // but to strictly follow "useCookie to store auth credential", we also do it here
//       // or rely on the server cookie. The user specifically asked to use useCookie.
//       const authCookie = useCookie("auth_token");
//       authCookie.value = JSON.stringify(data); // Storing user data in cookie for simplicity as requested

//       router.push("/");
//     } catch (error) {
//       console.error("Login failed", error);
//       throw error;
//     }
//   };

//   const register = async (credentials: any) => {
//     try {
//       const data = await $fetch("/api/auth/register", {
//         method: "POST",
//         body: credentials,
//       });
//       // Optionally auto-login or redirect to login
//       router.push("/auth/login");
//       return data;
//     } catch (error) {
//       console.error("Registration failed", error);
//       throw error;
//     }
//   };

//   const logout = () => {
//     user.value = null;
//     const authCookie = useCookie("auth_token");
//     authCookie.value = null;
//     router.push("/auth/login");
//   };

//   const initAuth = () => {
//     const authCookie = useCookie<UserState>("auth_token");
//     if (authCookie.value) {
//       user.value = authCookie.value;
//     }
//   };

//   return {
//     user,
//     login,
//     register,
//     logout,
//     initAuth,
//   };
// };
import { computed } from "vue";

export const useAuth = () => {
  const role: "guest" | "user" | "admin" = "guest"; // or 'guest' / 'user'

  const isLoggedIn = computed(() => role !== ("guest" as any)); // ← add "as any" here
  const isAdmin = computed(() => role === ("admin" as any)); // ← add "as any" here

  return { isLoggedIn, isAdmin };
};
