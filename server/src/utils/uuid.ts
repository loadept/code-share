import { v4, validate } from 'uuid'

export const generateUUID = () => v4()

export const validateUUID = (uuid: string) => validate(uuid)
