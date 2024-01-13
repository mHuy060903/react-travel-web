import { createContext, useState } from "react";

export const UserContext = createContext();

function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (user) => setUser(user);

  const logout = () => {
    setUser(null);
    localStorage.setItem("token", null);
  };

  const toogleFavorite = (id) => {
    if (user.favoriteTours.includes()) {
      user.favoriteTours.push(id);
    } else {
      user.favoriteTours.filter((idFa) => idFa !== id);
    }
  };

  return (
    <UserContext.Provider value={{ user, login, logout, toogleFavorite }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
