import { Header } from '../modules/home/components/header'
import { MainEditor } from '../modules/home/components/main-editor'
import { useEffect, useState, useRef } from 'preact/hooks'
import { route } from 'preact-router'
import useAuthStore from '../core/store/auth-store'
import useConnectionStore from '../core/store/session-store'
import useSocketStore from '../core/store/socket-store'
import { UserMinus, UserPlus } from '../modules/icons'
import { Notification } from '../modules/home/components/notification'
import useCodeStateStore from '../core/store/code-store'

const Home = () => {
  const { isAuthenticated, isLoading, authData } = useAuthStore()
  const { checkConnection, isConnected, roomId } = useConnectionStore()
  const {
    connect: connectSocket,
    disconnect: disconnectSocket,
    countConnections: countConnectionsSocket,
  } = useSocketStore()
  const { checkCodeState } = useCodeStateStore()
  const [notifications, setNotifications] = useState([])
  const initialCounts = useRef(countConnectionsSocket)

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      route('/auth', true)
    }
  }, [isAuthenticated, isLoading])

  useEffect(() => {
    checkConnection()
    checkCodeState()
  }, [])

  useEffect(() => {
    if (isConnected && authData?.accessToken && roomId) {
      connectSocket(roomId, authData.accessToken)
    }

    return () => {
      disconnectSocket()
    }
  }, [roomId, authData?.accessToken])

  useEffect(() => {
    if (!isConnected) {
      disconnectSocket()
    }
  }, [isConnected])

  useEffect(() => {
    if (!isConnected) return

    if (countConnectionsSocket !== initialCounts.current) {
      if (countConnectionsSocket > initialCounts.current) {
        addNotification({
          title: 'Usuario conectado',
          message: 'Un nuevo usuario se ha unido a la sesión.',
          color: '#4ec9b0',
          icon: <UserPlus className='h-5 w-5' />
        })
        initialCounts.current = countConnectionsSocket
      }
      if (countConnectionsSocket < initialCounts.current) {
        addNotification({
          title: 'Usuario desconectado',
          message: 'Un usuario ha abandonado la sesión.',
          color: '#ff6b35',
          icon: <UserMinus className='h-5 w-5' />
        })
        initialCounts.current = countConnectionsSocket
      }
    }
  }, [countConnectionsSocket])

  const addNotification = (notification) => {
    const id = Date.now().toString()
    const newNotification = { ...notification, id }
    setNotifications(prev => [...prev, newNotification])

    setTimeout(() => {
      removeNotification(id)
    }, 4000)
  }

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Cargando aplicación...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen h-screen flex flex-col overflow-hidden">
      <Notification notifications={notifications} removeNotification={removeNotification} />
      <Header />
      <MainEditor />
    </div>
  )
}

export default Home
