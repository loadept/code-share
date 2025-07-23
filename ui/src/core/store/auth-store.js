import { create } from 'zustand'

const useAuthStore = create((set, get) => ({
  authData: null,
  isAuthenticated: false,
  isLoading: true,

  login: (userData) => {
    localStorage.setItem('auth-data', JSON.stringify(userData))
    set({ authData: userData, isAuthenticated: true, isLoading: false })
  },

  logout: () => {
    localStorage.removeItem('auth-data')
    set({ authData: null, isAuthenticated: false, isLoading: false })
  },

  checkAuth: () => {
    try {
      const storedData = localStorage.getItem('auth-data')

      if (storedData) {
        const userData = JSON.parse(storedData)
        if (userData?.username) {
          set({ authData: userData, isAuthenticated: true, isLoading: false })
          return true
        }
      }

      set({ authData: null, isAuthenticated: false, isLoading: false })
      return false
    } catch (err) {
      console.error(`Error parsing user data: ${err}`)
      set({ authData: null, isAuthenticated: false, isLoading: false })
      return false
    }
  },

  initAuth: () => {
    const { checkAuth } = get()
    checkAuth()
  }
}))

export default useAuthStore
