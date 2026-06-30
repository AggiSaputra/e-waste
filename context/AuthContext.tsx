"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

type User = {
  id: string
  email: string
  role: string
  name?: string
}

type AuthContextType = {
  user: User | null
  setUser: (user: User | null) => void
  refreshUser: () => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  async function refreshUser() {
    try {
      const res = await fetch("/api/auth/me", {
        credentials: "include",
      })

      if (!res.ok) {
        setUser(null)
        return
      }

      const data = await res.json()
      setUser(data.user)
    } catch {
      setUser(null)
    }
  }

  async function logout() {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      })
    } catch (error) {
      console.error("Logout error:", error)
    }

    setUser(null)

    // 🔥 FIX: paksa update UI + redirect
    router.push("/login")
    router.refresh()
  }

  useEffect(() => {
    refreshUser()
  }, [])

  return (
    <AuthContext.Provider
      value={{ user, setUser, refreshUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider")
  }
  return context
}