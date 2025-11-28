"use client";

import type { User } from "@/lib/types";
import React, { createContext, useState, useEffect } from "react";

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isInitializing: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // Simulate checking auth state on client mount
    setIsInitializing(false);
  }, []);

  const login = (userData: User) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, isInitializing }}>
      {children}
    </AuthContext.Provider>
  );
}
