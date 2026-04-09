import {createContext, useState} from "react";
import type {ReactNode} from "react";
import type {AuthContextType, User} from "../types";

const AuthContext = createContext<AuthContextType | null>(null);

const FAKE_USERS = [
  {email: "admin@cardioia.com", password: "123456", name: "Ana Cornachi"},
  {email: "medico@cardioia.com", password: "123456", name: "Dr. Cardio"},
];

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("cardioia_user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = (email: string, password: string): boolean => {
    const found = FAKE_USERS.find(
      (u) => u.email === email && u.password === password,
    );

    if (!found) return false;

    const fakeToken = btoa(`${email}:${Date.now()}`);
    const userData: User = {name: found.name, email, token: fakeToken};

    setUser(userData);
    localStorage.setItem("cardioia_user", JSON.stringify(userData));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("cardioia_user");
  };

  return (
    <AuthContext.Provider
      value={{user, login, logout, isAuthenticated: !!user}}
    >
      {children}
    </AuthContext.Provider>
  );
};

export {AuthContext};
