import { Header } from '../modules/home/components/header'
import { MainEditor } from '../modules/home/components/main-editor'
import { useEffect } from 'preact/hooks'
import { route } from 'preact-router'
import useAuthStore from '../core/store/auth-store'
import useConnectionStore from '../core/store/session-store'
import useSocketStore from '../core/store/socket-store'

const Home = () => {
  const { isAuthenticated, isLoading, authData } = useAuthStore()
  const { checkConnection, isConnected, roomId } = useConnectionStore()
  const {
    connect: connectSocket,
    disconnect: disconnectSocket,
  } = useSocketStore()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      route('/auth', true)
    }
  }, [isAuthenticated, isLoading])

  useEffect(() => {
    checkConnection()
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
    <div className="min-h-screen h-screen flex flex-col">
      <Header />
      <MainEditor />
    </div>
  )
}

export default Home
