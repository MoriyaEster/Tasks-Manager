import { createContext, useContext, useState } from 'react';

export const LoginContext = createContext();

export function LoginProvider({ children }) {
  const [userName, setUserName] = useState("");

  return (
    <LoginContext.Provider value={{ userName, setUserName }}>
      {children}
    </LoginContext.Provider>
  );
}

export function useLogin() {
  return useContext(LoginContext);
}
