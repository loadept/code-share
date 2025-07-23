import { io } from 'socket.io-client'
import { create } from 'zustand'

const useSocketStore = create((set, get) => ({
  socket: null,
  isSocketConnected: false,
  connectionUsers: [],
  connectionError: null,

  SOCKET_SERVER_URL: SOCKET_SERVER_URL,

  connect: () => {
    const { socket, disconnect } = get()

    if (socket) {
      disconnect()
    }

    try {
      const { SOCKET_SERVER_URL } = get()

      const newSocket = io(SOCKET_SERVER_URL, {
        transports: ['websocket'],
        query: {
          roomId,
        },
        auth: {
          token: 'pepepepe'
        }
      })

      newSocket.emit('joinRoom')

      newSocket.on('connectError', (error) => {
        console.error('Connection error Socket.IO:', error)
        get().handleError('Server connection error')
      })

      newSocket.on('disconnect', (reason) => {
        console.log(`Socket disconnected ${reason}`)
        set({ isSocketConnected: false })

        if (reason !== 'io client disconnect') {
          get().handleError('Connection lost')
        }
      })


      get().setupRoomEvents(newSocket)

      get().setupEditorEvents(newSocket)
    } catch (err) {
      console.error(`Error creating socket ${err}`)
      get().handleError('Error establishing connection')
    }
  },

  setupRoomEvents: (socket) => {
    socket.on('userJoined', (userData) => {
      console.log(`A user join ${userData}`)
      const { connectedUsers } = get()
      const exists = connectedUsers.find(user => user.id === userData.id)

      if (!exists) {
        set({
          connectedUsers: [...connectedUsers, userData]
        })
      }
    })

    socket.on('userLeft', (userData) => {
      console.log(`A user left ${userData}`)
      const { connectedUsers } = get()
      set({
        connectedUsers: connectedUsers.filter(user => user.id !== userData.id)
      })
    })

    socket.on('usersInRoom', (users) => {
      console.log(`Users in room ${users}`)
      set({ connectedUsers: users || [] })
    })

    socket.on('roomError', (error) => {
      console.error(`Error in room ${error}`)
      get().handleError(error)
    })
  },

  setupEditorEvents: (socket) => {
    socket.on('codeChange', (data) => {
      window.dispatchEvent(new CustomEvent('socketCodeChange', { 
        detail: data 
      }))
    })

    socket.on('cursorPosition', (data) => {
      window.dispatchEvent(new CustomEvent('socketCursorPosition', { 
        detail: data 
      }))
    })

    socket.on('selectionChange', (data) => {
      window.dispatchEvent(new CustomEvent('socketSelectionChange', { 
        detail: data 
      }))
    })
  },


  disconnect: () => {
    const { socket } = get()
    
    if (socket) {
      socket.disconnect()
    }

    set({
      socket: null,
      isSocketConnected: false,
      connectedUsers: [],
      connectionError: null
    })
  },

  leaveRoom: (roomId) => {
    const { socket } = get()
    
    if (socket && socket.connected) {
      socket.emit('leaveRoom', { roomId }, (response) => {
        if (response?.success) {
          console.log(`Left room ${roomId}`)
        }
      })
    }
  },
}))

export default useSocketStore
