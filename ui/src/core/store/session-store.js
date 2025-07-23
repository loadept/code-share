import { create } from 'zustand'

const useConnectionStore = create((set, get) => ({
  roomId: '',
  roomUrl: '',
  isConnected: false,
  showUsersList: false,
  showConnectionModal: false,
  isLoading: true,

  generateRoomId: () => Math.random().toFixed(32).slice(2),

  disconnect: () => {
    const url = new URL(window.location.href)
    url.searchParams.delete('room')
    window.history.pushState({}, '', url)

    set({
      isConnected: false,
      roomId: '',
      roomUrl: '',
      showUsersList: false,
      isLoading: false
    })
  },

  initiateConnection: () => {
    const { generateRoomId } = get()
    const roomId = generateRoomId()
    const url = new URL(window.location.href)
    url.searchParams.delete('room')
    url.searchParams.set('room', roomId)

    set({
      roomId,
      roomUrl: url.toString(),
      showConnectionModal: true,
      isLoading: false
    })
  },

  confirmConnection: () => {
    const { roomUrl } = get()
    window.history.pushState({}, '', roomUrl)
    set({
      isConnected: true,
      showConnectionModal: false,
      isLoading: false
    })
  },

  toggleUsersList: () => {
    const { isConnected, showUsersList } = get()
    if (isConnected) {
      set({ showUsersList: !showUsersList, isLoading: false })
    }
  },

  checkConnection: () => {
    const url = new URL(window.location.href)
    const roomId = url.searchParams.get('room')

    if (roomId && roomId.length === 32) {
      set({
        roomId,
        isConnected: true,
        roomUrl: url.toString(),
        isLoading: false
      })
      return true
    }

    set({
      isConnected: false,
      roomId: '',
      roomUrl: '',
      isLoading: false
    })
    url.searchParams.delete('room')
    window.history.pushState({}, '', url)
    return false
  },

  initialize: () => {
    const { checkConnection } = get()
    checkConnection()
  }
}))

export default useConnectionStore
