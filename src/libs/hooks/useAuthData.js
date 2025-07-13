const useAuthData = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const isLoggedIn = user && token;

  return {
    user,
    token,
    isLoggedIn,
  };
};

export default useAuthData;
