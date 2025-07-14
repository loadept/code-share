let isEnvsLoaded = false

const LoadEnviron = () => {
  if (!isEnvsLoaded) {
    console.log('Loading environment variables')
    process.loadEnvFile()
    isEnvsLoaded = true
  }

}
LoadEnviron()

export const {
  DEBUG,
  PORT,
} = process.env
