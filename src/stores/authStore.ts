import { create } from 'zustand'
import { auth } from '../firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'

export type AuthUser = { uid: string; email: string | null }

interface AuthState {
  user: AuthUser | null
  loading: boolean
  error: string | null
  setUser: (user: AuthUser | null) => void
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const STORAGE_KEY = 'health-assessment-auth'

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,
  setUser: (user) => {
    set({ user, error: null })
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  },
  login: async (email, password) => {
    set({ loading: true, error: null })
    try {
      if (!auth) {
        const fakeUser = { uid: 'local-demo', email }
        set({ user: fakeUser, loading: false })
        localStorage.setItem(STORAGE_KEY, JSON.stringify(fakeUser))
        return
      }

      const result = await signInWithEmailAndPassword(auth, email, password)
      const firebaseUser = result.user
      const user = { uid: firebaseUser.uid, email: firebaseUser.email }
      set({ user, loading: false })
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      set({ error: message, loading: false })
    }
  },
  signup: async (email, password) => {
    set({ loading: true, error: null })
    try {
      if (!auth) {
        const fakeUser = { uid: 'local-demo-signup', email }
        set({ user: fakeUser, loading: false })
        localStorage.setItem(STORAGE_KEY, JSON.stringify(fakeUser))
        return
      }

      const result = await createUserWithEmailAndPassword(auth, email, password)
      const firebaseUser = result.user
      const user = { uid: firebaseUser.uid, email: firebaseUser.email }
      set({ user, loading: false })
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      set({ error: message, loading: false })
    }
  },
  logout: async () => {
    set({ loading: true, error: null })
    try {
      if (auth) {
        await signOut(auth)
      }
      set({ user: null, loading: false })
      localStorage.removeItem(STORAGE_KEY)
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      set({ error: message, loading: false })
    }
  },
}))

export const hydrateUserStoreFromStorage = () => {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    try {
      const user = JSON.parse(stored) as AuthUser
      useAuthStore.getState().setUser(user)
    } catch {
      localStorage.removeItem(STORAGE_KEY)
    }
  }
}
