import { Context, Next } from 'hono'
import { jwtService } from '../services'

export interface AuthContext extends Context {
  user?: {
    userId: number
    email: string
  }
}

export const authMiddleware = async (c: AuthContext, next: Next) => {
  try {
    const authHeader = c.req.header('Authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ error: 'Authorization token is required' }, 401)
    }

    const token = authHeader.substring(7) // Remove 'Bearer ' prefix

    const payload = jwtService.verifyAccessToken(token)

    if (!payload) {
      return c.json({ error: 'Invalid or expired token' }, 401)
    }

    // Add user info to context
    c.user = {
      userId: payload.userId,
      email: payload.email,
    }

    await next()
  } catch (error) {
    console.error('Auth middleware error:', error)
    return c.json({ error: 'Authentication failed' }, 401)
  }
}

// Optional auth middleware - doesn't fail if no token provided
export const optionalAuthMiddleware = async (c: AuthContext, next: Next) => {
  try {
    const authHeader = c.req.header('Authorization')

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7)
      const payload = jwtService.verifyAccessToken(token)

      if (payload) {
        c.user = {
          userId: payload.userId,
          email: payload.email,
        }
      }
    }

    await next()
  } catch (error) {
    console.error('Optional auth middleware error:', error)
    // Continue without authentication for optional middleware
    await next()
  }
}
