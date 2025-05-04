import { createContext, useContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [userName, setUserNameState] = useState(() =>
    localStorage.getItem("userName") || ""
  );

  const setUserName = (name) => {
    console.log("setUserName", name)
    setUserNameState(name)
    if (name) {
      localStorage.setItem("userName", name)
    } else {
      localStorage.removeItem("userName")
    }
  }

  return (
    <UserContext.Provider value={{ userName, setUserName }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
