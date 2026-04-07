import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { login, register, logout } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const loginAction = useCallback(async (email, password) => {
    const res = await login(email, password);
    localStorage.setItem("token", res.token);
    const payload = JSON.parse(atob(res.token.split(".")[1]));
    const u = { id: payload.id, email: payload.email };
    setUser(u);
    return u;
  }, []);

  const registerAction = useCallback(async (name, email, password, confirmpassword) => {
    const res = await register(name, email, password, confirmpassword);
    localStorage.setItem("token", res.token);
    const payload = JSON.parse(atob(res.token.split(".")[1]));
    const u = { id: payload.id, email: payload.email, name };
    setUser(u);
    return u;
  }, []);

  const logoutAction = useCallback(() => {
    logout().catch(() => {});
    localStorage.removeItem("token");
    setUser(null);
  }, []);

  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login: loginAction, register: registerAction, logout: logoutAction }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
