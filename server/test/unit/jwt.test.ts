import { describe, it, expect } from 'vitest'
import { authJwt } from '../../src/config/authJwt'

describe('JWT Utility', () => {
  it('should create a new token and verify it', () => {
    process.env.SECRET_KEY = '1234567890abcdef'

    const payload = { userId: '123', username: 'testuser' }

    const token = authJwt.signToken(payload)
    expect(typeof token).toBe('string')

    const decoded = authJwt.verifyToken(token)
    expect(decoded).toMatchObject(payload)
  })
})
