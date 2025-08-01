import { render } from 'preact'
import './index.css'
import { Home, Auth } from './pages'
import Router from 'preact-router'
import useAuthStore from './core/store/auth-store'
import { useEffect } from 'preact/hooks'
import useConnectionStore from './core/store/session-store'

const App = () => {
  const { initAuth, isLoading } = useAuthStore()
  const { initialize } = useConnectionStore()

  useEffect(() => {
    initAuth()
    initialize()
  }, [])
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Cargando...</div>
      </div>
    )
  }

  return (
    <Router>
      <Home path='/' />
      <Auth path='/auth' default />
    </Router>
  )
}
render(<App />, document.getElementById('app'))
