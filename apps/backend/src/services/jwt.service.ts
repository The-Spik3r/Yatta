import jwt from 'jsonwebtoken'
import { z } from 'zod'

const JWT_SECRET =
  process.env.JWT_SECRET ||
  'your-super-secret-jwt-key-change-this-in-production'
const JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET ||
  'your-super-secret-refresh-key-change-this-in-production'

export interface JWTPayload {
  userId: number
  email: string
}

export interface TokenPair {
  accessToken: string
  refreshToken: string
}

export class JWTService {
  private readonly accessTokenExpiry = '15m'
  private readonly refreshTokenExpiry = '7d'

  generateTokenPair(payload: JWTPayload): TokenPair {
    const accessToken = jwt.sign(payload, JWT_SECRET, {
      expiresIn: this.accessTokenExpiry,
    })

    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {
      expiresIn: this.refreshTokenExpiry,
    })

    return { accessToken, refreshToken }
  }

  verifyAccessToken(token: string): JWTPayload | null {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload
      return decoded
    } catch (error) {
      return null
    }
  }

  verifyRefreshToken(token: string): JWTPayload | null {
    try {
      const decoded = jwt.verify(token, JWT_REFRESH_SECRET) as JWTPayload
      return decoded
    } catch (error) {
      return null
    }
  }

  generateResetToken(): string {
    return jwt.sign({ type: 'reset' }, JWT_SECRET, { expiresIn: '1h' })
  }

  verifyResetToken(token: string): boolean {
    try {
      jwt.verify(token, JWT_SECRET)
      return true
    } catch (error) {
      return false
    }
  }
}

export const jwtService = new JWTService()
