import { FormSection } from '../modules/auth/components/form-section'
import { LogoSection } from '../modules/auth/components/logo-section'
import apiClient from '../core/utils/apiClient'
import { useEffect } from 'preact/hooks'
import { route } from 'preact-router'
import useAuthStore from '../core/store/auth-store'

const Auth = () => {
  const { isAuthenticated, login, isLoading } = useAuthStore()

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      route('/', true)
    }
  }, [isAuthenticated, isLoading])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Verificando autenticación...</div>
      </div>
    )
  }

  if (isAuthenticated) {
    return null
  }

  const handleClick = async ({ username }) => {
    try {
      const { data } = await apiClient.post('/auth', {
        username
      })

      const authData = {
        userId: data.data.userId,
        username: data.data.username,
        accessToken: data.accessToken
      }
      login(authData)
      route('/', true)
    } catch (err) {
      console.error(`An error ocurred ${err}`)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <main className="w-full max-w-md">
        <LogoSection />
        <FormSection onClick={handleClick} />
      </main>
    </div>
  )
}

export default Auth
