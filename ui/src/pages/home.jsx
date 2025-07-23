import { Header } from '../modules/home/components/header'
import { MainEditor } from '../modules/home/components/main-editor'
import { useEffect } from 'preact/hooks'
import { route } from 'preact-router'
import useAuthStore from '../core/store/auth-store'
import useConnectionStore from '../core/store/connection-store'

const Home = () => {
  const { isAuthenticated, isLoading } = useAuthStore()
  const { checkConnection } = useConnectionStore()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      route('/auth', true)
    }
  }, [isAuthenticated, isLoading])
  
  useEffect(() => {
    checkConnection()
  }, [])

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
