import { Context } from 'hono'
import { authService, type IAuthService } from '../services'
import { z } from 'zod'

export class AuthController {
  constructor(private authService: IAuthService) {}

  register = async (c: Context) => {
    try {
      const body = await c.req.json()

      const result = await this.authService.register(body)

      // Set refresh token as httpOnly cookie
      c.res.headers.set(
        'Set-Cookie',
        `refreshToken=${result.refreshToken}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=604800`
      ) // 7 days

      return c.json(
        {
          user: result.user,
          accessToken: result.accessToken,
        },
        201
      )
    } catch (error) {
      console.error('Error during registration:', error)

      if (error instanceof z.ZodError) {
        return c.json(
          {
            error: 'Validation error',
            details: error.issues,
          },
          400
        )
      }

      if (error instanceof Error) {
        if (error.message.includes('already exists')) {
          return c.json({ error: error.message }, 409)
        }
        if (
          error.message.includes('required') ||
          error.message.includes('Invalid')
        ) {
          return c.json({ error: error.message }, 400)
        }
      }

      return c.json({ error: 'Internal server error' }, 500)
    }
  }

  login = async (c: Context) => {
    try {
      const body = await c.req.json()

      const result = await this.authService.login(body)

      // Set refresh token as httpOnly cookie
      c.res.headers.set(
        'Set-Cookie',
        `refreshToken=${result.refreshToken}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=604800`
      ) // 7 days

      return c.json({
        user: result.user,
        accessToken: result.accessToken,
      })
    } catch (error) {
      console.error('Error during login:', error)

      if (error instanceof z.ZodError) {
        return c.json(
          {
            error: 'Validation error',
            details: error.issues,
          },
          400
        )
      }

      if (error instanceof Error) {
        if (error.message.includes('Invalid email or password')) {
          return c.json({ error: 'Invalid email or password' }, 401)
        }
        if (error.message.includes('required')) {
          return c.json({ error: error.message }, 400)
        }
      }

      return c.json({ error: 'Internal server error' }, 500)
    }
  }

  forgotPassword = async (c: Context) => {
    try {
      const body = await c.req.json()

      const result = await this.authService.forgotPassword(body)

      return c.json(result)
    } catch (error) {
      console.error('Error during forgot password:', error)

      if (error instanceof z.ZodError) {
        return c.json(
          {
            error: 'Validation error',
            details: error.issues,
          },
          400
        )
      }

      if (error instanceof Error && error.message.includes('required')) {
        return c.json({ error: error.message }, 400)
      }

      return c.json({ error: 'Internal server error' }, 500)
    }
  }

  resetPassword = async (c: Context) => {
    try {
      const body = await c.req.json()

      const result = await this.authService.resetPassword(body)

      return c.json(result)
    } catch (error) {
      console.error('Error during password reset:', error)

      if (error instanceof z.ZodError) {
        return c.json(
          {
            error: 'Validation error',
            details: error.issues,
          },
          400
        )
      }

      if (error instanceof Error) {
        if (
          error.message.includes('Invalid') ||
          error.message.includes('expired')
        ) {
          return c.json({ error: error.message }, 400)
        }
        if (error.message.includes('required')) {
          return c.json({ error: error.message }, 400)
        }
      }

      return c.json({ error: 'Internal server error' }, 500)
    }
  }

  refreshToken = async (c: Context) => {
    try {
      // Get refresh token from cookie or Authorization header
      const refreshTokenFromCookie = c.req
        .header('Cookie')
        ?.split('refreshToken=')[1]
        ?.split(';')[0]
      const refreshTokenFromHeader = c.req
        .header('Authorization')
        ?.replace('Bearer ', '')

      const refreshToken = refreshTokenFromCookie || refreshTokenFromHeader

      if (!refreshToken) {
        return c.json({ error: 'Refresh token is required' }, 401)
      }

      const result = await this.authService.refreshToken(refreshToken)

      // Set new refresh token as httpOnly cookie
      c.res.headers.set(
        'Set-Cookie',
        `refreshToken=${result.refreshToken}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=604800`
      ) // 7 days

      return c.json({
        accessToken: result.accessToken,
      })
    } catch (error) {
      console.error('Error during token refresh:', error)

      if (error instanceof Error) {
        if (
          error.message.includes('Invalid') ||
          error.message.includes('not found')
        ) {
          return c.json({ error: 'Invalid refresh token' }, 401)
        }
      }

      return c.json({ error: 'Internal server error' }, 500)
    }
  }

  logout = async (c: Context) => {
    try {
      // Clear refresh token cookie
      c.res.headers.set(
        'Set-Cookie',
        'refreshToken=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0'
      )

      return c.json({ message: 'Logged out successfully' })
    } catch (error) {
      console.error('Error during logout:', error)
      return c.json({ error: 'Internal server error' }, 500)
    }
  }

  me = async (c: Context) => {
    try {
      // The user should be set by the auth middleware
      const user = c.get('user')

      if (!user) {
        return c.json({ error: 'User not found in context' }, 401)
      }

      return c.json({ user })
    } catch (error) {
      console.error('Error getting user profile:', error)
      return c.json({ error: 'Internal server error' }, 500)
    }
  }
}

// Create controller instance
export const authController = new AuthController(authService)
