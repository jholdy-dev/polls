import { create } from 'zustand'
import { User } from '@lib/schema'

type AuthStore = {
  user: Omit<User, 'password'> | null
  setUser: (user: Omit<User, 'password'>) => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user))
    set({ user })
  },
  logout: () => {
    localStorage.removeItem('user')
    set({ user: null })
  },
}))
