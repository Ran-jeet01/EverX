type User = {
  isAdmin: boolean;
};

export const useAuth = () => {
  const user = useCookie<User | null>("user");

  user.value = { isAdmin: true };

  const isLoggedIn = computed(() => !!user.value); // true if cookie exists
  const isAdmin = computed(() => user.value?.isAdmin ?? false); // directly from cookie

  return { isLoggedIn, isAdmin };
};
