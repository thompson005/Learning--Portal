"use client"

import { createContext, useContext } from "react"

export type AuthUser = { id: string; email: string; name: string }

export interface AuthValue {
  user: AuthUser | null
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthValue>({
  user: null,
  logout: async () => {},
})

export function useAuth() {
  return useContext(AuthContext)
}
