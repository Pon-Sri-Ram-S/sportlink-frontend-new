import { createContext, useContext, useState, ReactNode } from 'react'
import { User } from '../types'

interface AuthContextType {
  user: User | null
  login: (user: User) => void
  logout: () => void
  token: string | null
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('sportlink_user')
    return stored ? JSON.parse(stored) : null
  })

  const login = (userData: User) => {
    setUser(userData)
    localStorage.setItem('sportlink_user', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('sportlink_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, token: user?.token ?? null }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
