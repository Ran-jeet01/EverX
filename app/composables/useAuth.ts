// type User = {
//   role: "admin" | "user";
// };

// export const useAuth = () => {
//   const user = useCookie<User | null>("user");

//   const isLoggedIn = computed(() => !!user.value);
//   const isAdmin = computed(() => user.value?.role === "admin");

//   return { user, isLoggedIn, isAdmin };
// };
type User = {
  isAdmin: boolean;
};

export const useAuth = () => {
  const user = useCookie<User | null>("user");

  user.value = { isAdmin: false };

  const isLoggedIn = computed(() => !!user.value); // true if cookie exists
  const isAdmin = computed(() => user.value?.isAdmin ?? false); // directly from cookie

  return { isLoggedIn, isAdmin };
};
