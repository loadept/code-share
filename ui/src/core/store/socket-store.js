import { io } from 'socket.io-client'
import { create } from 'zustand'

const useSocketStore = create((set, get) => ({
  socket: null,
  isConnected: false,
  connectedUsers: [],
  countConnections: 0,
  isConnecting: false,

  SOCKET_SERVER_URL: API_URL,

  connect: (roomId, authToken) => {
    const { socket: currentSocket, disconnect } = get()

    if (currentSocket) {
      disconnect()
    }

    set({ isConnecting: true })

    try {
      const { SOCKET_SERVER_URL } = get()

      const socket = io(SOCKET_SERVER_URL, {
        query: { roomId },
        auth: { token: authToken },
        reconnectionDelay: 1000,
      })

      socket.on('connect', () => {
        console.log(`socket connected ${socket.id}`);

        set({ isConnected: true, isConnecting: false })
        socket.emit('joinRoom')
      })

      socket.on('disconnect', (reason) => {
        console.log(`Socket disconnected ${reason}`)
        set({
          isConnected: false,
          isConnecting: false,
          connectedUsers: [],
          countConnections: 0
        })
      })

      socket.on('roomUpdates', ({ _roomId, count, users }) => {
        set({
          countConnections: count,
          connectedUsers: users
        })
      })

      set({ socket, isConnecting: false })

      return socket
    } catch (err) {
      console.error(`Error creating socket ${err}`)
      set({ isConnecting: false, isConnected: false })
      return null
    }
  },

  disconnect: () => {
    const { socket } = get()
    
    if (socket) {
      socket.emit('leaveRoom')
      socket.removeAllListeners()
      socket.disconnect()
      console.log('Socket disconnected manually')
    }

    set({
      socket: null,
      isConnected: false,
      connectedUsers: [],
      countConnections: 0,
      isConnecting: false
    })
  },

  emit: (event, data) => {
    const { socket, isConnected } = get()

    if (socket && isConnected) {
      socket.emit(event, data)
    } else {
      console.warn('e')
    }
  },

  on: (event, callback) => {
    const { socket } = get()

    if (socket) {
      socket.on(event, callback)
    }
  },

  off: (event, callback) => {
    const { socket } = get()

    if (socket) {
      if (callback) {
        socket.off(event, callback)
      } else {
        socket.removeAllListeners(event)
      }
    }
  },

  reset: () => {
    const { disconnect } = get()
    disconnect()
  }
}))

export default useSocketStore
