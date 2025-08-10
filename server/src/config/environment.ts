import { exit } from 'node:process'

const getEnv = (env: string) => {
  const value = process.env[env]
  if (!value) {
    console.error(`Missing environment variable: ${env}`)
    exit(1)
  }
  return value
}

export default getEnv
