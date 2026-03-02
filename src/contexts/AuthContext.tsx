import React, { createContext, useContext, useState, useCallback } from "react";

export type UserRole = "kol" | "company" | "admin";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  [key: string]: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const MOCK_USERS: Record<string, User> = {
  "kol@demo.com": { id: "1", email: "kol@demo.com", name: "Sarah Chen", role: "kol", avatar: "" },
  "company@demo.com": { id: "2", email: "company@demo.com", name: "TechBrand Inc.", role: "company", avatar: "" },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("kol_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email: string, _password: string) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const mockUser = MOCK_USERS[email];
    if (mockUser) {
      setUser(mockUser);
      localStorage.setItem("kol_user", JSON.stringify(mockUser));
    } else {
      // Default to KOL for any email
      const newUser: User = { id: "3", email, name: email.split("@")[0], role: "kol" };
      setUser(newUser);
      localStorage.setItem("kol_user", JSON.stringify(newUser));
    }
    setIsLoading(false);
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const newUser: User = { id: Date.now().toString(), email: data.email, name: data.name, role: data.role };
    setUser(newUser);
    localStorage.setItem("kol_user", JSON.stringify(newUser));
    setIsLoading(false);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("kol_user");
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
