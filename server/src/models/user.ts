import { z } from 'zod'

export interface User {
  userId: string
  username: string
}

const UserSchema = z.object({
  username: z.string('username field is required')
    .min(3, 'The field is too short')
    .nonempty('username field is required')
})

export const userValidation = (data: User) => {
  return UserSchema.safeParse(data)
}
