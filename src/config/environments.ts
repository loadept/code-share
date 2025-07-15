let isLoaded = false

const loadEnv = () => {
  if (!isLoaded) {
    console.log('Cargando variables de entorno...')
    process.loadEnvFile()
    isLoaded = true
  }
}
loadEnv()

export const {
  DEBUG,
  PORT,
} = process.env
