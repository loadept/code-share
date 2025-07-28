let isLoaded = false

const getEnv = (env: string) => {
  if (!isLoaded) {
    console.log('Cargando variables de entorno...')
    process.loadEnvFile()
    isLoaded = true
  }

  const value = process.env[env]
  if (!value) throw new Error(`Missing environment variable: ${env}`)
  return value
}

export default getEnv
