"use client";

import type { User } from "@/lib/types";
import React, { createContext, useState } from "react";

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
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = () => setUser(mockUser);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
