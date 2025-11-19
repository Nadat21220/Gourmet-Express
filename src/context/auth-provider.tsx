"use client";

import type { User } from "@/lib/types";
import React, { createContext, useState, useEffect } from "react";

const mockUser: User = {
    uid: '123',
    email: 'user@example.com',
    name: 'Juan Pérez',
    phone: '555-1234',
    role: 'cliente',
}

interface AuthContextType {
  user: User | null;
  login: () => void;
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

  const login = () => setUser(mockUser);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, isInitializing }}>
      {children}
    </AuthContext.Provider>
  );
}
