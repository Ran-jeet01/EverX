interface UserState {
  id: number;
  email: string;
  name: string | null;
  role: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  user: UserState;
  token: string;
}

export const useAuth = () => {
  const user = useState<UserState | null>("user", () => null);
  const router = useRouter();

  const login = async (credentials: LoginCredentials) => {
    try {
      const data = await $fetch<LoginResponse>("/api/auth/login", {
        method: "POST",
        body: credentials,
      });

      user.value = data.user;

      // Redirect based on role
      if (user.value.role === "admin") {
        await router.push("/admin");
      } else {
        await router.push("/");
      }
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  const register = async (credentials: LoginCredentials) => {
    try {
      await $fetch("/api/auth/register", {
        method: "POST",
        body: credentials,
      });

      router.push("/auth/login");
    } catch (error) {
      console.error("Registration failed", error);
      throw error;
    }
  };

  const logout = () => {
    user.value = null;
    const authCookie = useCookie("auth_token");
    authCookie.value = null;
    router.push("/auth/login");
  };

  const initAuth = async () => {
    try {
      const data = await $fetch<UserState>("/api/auth/me", {
        retry: 0,
      });
      user.value = data;
    } catch {
      user.value = null;
    }
  };

  const isLoggedIn = computed(() => Boolean(user.value));
  const isAdmin = computed(() => user.value?.role === "admin");

  return {
    user,
    isLoggedIn,
    isAdmin,
    login,
    register,
    logout,
    initAuth,
  };
};
