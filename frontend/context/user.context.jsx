const { createContext, useState, useEffect } = require("react");

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const loadUserFromLocalStorage = async () => {
      const userInfo = await localStorage.getItem("userInfo");
      const token = await localStorage.getItem("token");

      if (!userInfo || !token) {
        await localStorage.removeItem("userInfo");
        await localStorage.removeItem("token");
        setUserInfo(null);
        setToken(null);
        return;
      }
      setUserInfo(JSON.parse(userInfo));
      setToken(token);
      setIsLoading(false);
    };

    loadUserFromLocalStorage();
  }, []);

  const loginUser = async ({ token, user }) => {
    await localStorage.setItem("token", token);
    await localStorage.setItem("userInfo", JSON.stringify(user));
    setToken(token);
    setUserInfo(user);
  };

  const logoutUser = async () => {
    await localStorage.removeItem("token");
    await localStorage.removeItem("userInfo");
    setUserInfo(null);
  };

  return (
    <UserContext.Provider
      value={{
        loginUser: loginUser,
        logoutUser: logoutUser,
        userInfo: userInfo,
        isLoading: isLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
