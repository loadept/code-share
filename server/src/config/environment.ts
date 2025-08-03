const getEnv = (env: string) => {
  const value = process.env[env]
  if (!value) throw new Error(`Missing environment variable: ${env}`)
  return value
}

export default getEnv
