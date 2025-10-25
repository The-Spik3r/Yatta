import { UserRepository, type IUserRepository } from '../repositories'
import { hashService, jwtService, emailService } from './index'
import {
  registerUserSchema,
  loginUserSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  type User,
} from '../database/schema'
import { z } from 'zod'

export interface RegisterResponse {
  user: Omit<User, 'password' | 'resetToken' | 'resetTokenExpiry'>
  accessToken: string
  refreshToken: string
}

export interface LoginResponse {
  user: Omit<User, 'password' | 'resetToken' | 'resetTokenExpiry'>
  accessToken: string
  refreshToken: string
}

export interface IAuthService {
  register(
    userData: z.infer<typeof registerUserSchema>
  ): Promise<RegisterResponse>
  login(credentials: z.infer<typeof loginUserSchema>): Promise<LoginResponse>
  forgotPassword(
    data: z.infer<typeof forgotPasswordSchema>
  ): Promise<{ message: string }>
  resetPassword(
    data: z.infer<typeof resetPasswordSchema>
  ): Promise<{ message: string }>
  refreshToken(
    refreshToken: string
  ): Promise<{ accessToken: string; refreshToken: string }>
}

export class AuthService implements IAuthService {
  constructor(private userRepository: IUserRepository) {}

  async register(
    userData: z.infer<typeof registerUserSchema>
  ): Promise<RegisterResponse> {
    const validatedData = registerUserSchema.parse(userData)

    const existingUser = await this.userRepository.findByEmail(
      validatedData.email
    )
    if (existingUser) {
      throw new Error('User with this email already exists')
    }

    const hashedPassword = await hashService.hashPassword(
      validatedData.password
    )

    const newUser = await this.userRepository.create({
      ...validatedData,
      password: hashedPassword,
      emailVerified: false,
    })

    const tokens = jwtService.generateTokenPair({
      userId: newUser.id,
      email: newUser.email,
    })

    emailService
      .sendWelcomeEmail(newUser.email, newUser.name)
      .catch(console.error)

    const {
      password,
      resetToken,
      resetTokenExpiry,
      ...userWithoutSensitiveData
    } = newUser

    return {
      user: userWithoutSensitiveData,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    }
  }

  async login(
    credentials: z.infer<typeof loginUserSchema>
  ): Promise<LoginResponse> {
    const validatedCredentials = loginUserSchema.parse(credentials)

    const user = await this.userRepository.findByEmail(
      validatedCredentials.email
    )
    if (!user) {
      throw new Error('Invalid email or password')
    }

    const isPasswordValid = await hashService.comparePassword(
      validatedCredentials.password,
      user.password
    )
    if (!isPasswordValid) {
      throw new Error('Invalid email or password')
    }

    await this.userRepository.updateLastLogin(user.id)

    const tokens = jwtService.generateTokenPair({
      userId: user.id,
      email: user.email,
    })

    // Remove sensitive data
    const {
      password,
      resetToken,
      resetTokenExpiry,
      ...userWithoutSensitiveData
    } = user

    return {
      user: userWithoutSensitiveData,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    }
  }

  async forgotPassword(
    data: z.infer<typeof forgotPasswordSchema>
  ): Promise<{ message: string }> {
    const validatedData = forgotPasswordSchema.parse(data)

    const user = await this.userRepository.findByEmail(validatedData.email)
    if (!user) {
      return {
        message:
          'If an account with that email exists, we have sent a password reset link.',
      }
    }

    const resetToken = jwtService.generateResetToken()
    const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000).toISOString()

    await this.userRepository.updateResetToken(
      user.email,
      resetToken,
      resetTokenExpiry
    )

    const emailSent = await emailService.sendPasswordResetEmail(
      user.email,
      resetToken
    )
    if (!emailSent) {
      console.error('Failed to send password reset email to:', user.email)
    }

    return {
      message:
        'If an account with that email exists, we have sent a password reset link.',
    }
  }

  async resetPassword(
    data: z.infer<typeof resetPasswordSchema>
  ): Promise<{ message: string }> {
    // Validate input
    const validatedData = resetPasswordSchema.parse(data)

    // Verify reset token
    const isTokenValid = jwtService.verifyResetToken(validatedData.token)
    if (!isTokenValid) {
      throw new Error('Invalid or expired reset token')
    }

    // Find user by reset token
    const user = await this.userRepository.findByResetToken(validatedData.token)
    if (!user) {
      throw new Error('Invalid or expired reset token')
    }

    // Check if token is expired
    if (user.resetTokenExpiry && new Date(user.resetTokenExpiry) < new Date()) {
      throw new Error('Reset token has expired')
    }

    // Hash new password
    const hashedPassword = await hashService.hashPassword(
      validatedData.password
    )

    // Update user password and clear reset token
    await this.userRepository.update(user.id, { password: hashedPassword })
    await this.userRepository.clearResetToken(user.id)

    return { message: 'Password has been reset successfully' }
  }

  async refreshToken(
    refreshToken: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    // Verify refresh token
    const payload = jwtService.verifyRefreshToken(refreshToken)
    if (!payload) {
      throw new Error('Invalid refresh token')
    }

    // Check if user still exists
    const user = await this.userRepository.findById(payload.userId)
    if (!user) {
      throw new Error('User not found')
    }

    // Generate new tokens
    const newTokens = jwtService.generateTokenPair({
      userId: user.id,
      email: user.email,
    })

    return {
      accessToken: newTokens.accessToken,
      refreshToken: newTokens.refreshToken,
    }
  }
}

// Create service instance
const userRepository = new UserRepository()
export const authService = new AuthService(userRepository)
