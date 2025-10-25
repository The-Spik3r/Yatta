import { z } from 'zod'

// Schema for user registration
export const registerUserSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters')
    .describe('Full name of the user'),
  email: z
    .string()
    .email('Invalid email format')
    .describe('User email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password must be less than 100 characters')
    .describe('User password (minimum 8 characters)'),
})

// Schema for user login
export const loginUserSchema = z.object({
  email: z
    .string()
    .email('Invalid email format')
    .describe('User email address'),
  password: z.string().min(1, 'Password is required').describe('User password'),
})

// Schema for forgot password
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email('Invalid email format')
    .describe('Email address to send reset link to'),
})

// Schema for reset password
export const resetPasswordSchema = z.object({
  token: z
    .string()
    .min(1, 'Reset token is required')
    .describe('Password reset token from email'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password must be less than 100 characters')
    .describe('New password (minimum 8 characters)'),
})

// User response schema (without sensitive fields)
export const userResponseSchema = z.object({
  id: z.number().describe('User ID'),
  name: z.string().describe('User name'),
  email: z.string().email().describe('User email'),
  emailVerified: z.boolean().describe('Email verification status'),
  lastLogin: z.string().nullable().describe('Last login timestamp'),
  createdAt: z.string().describe('Account creation timestamp'),
  updatedAt: z.string().describe('Account last update timestamp'),
})

// Auth response schema
export const authResponseSchema = z.object({
  user: userResponseSchema,
  accessToken: z.string().describe('JWT access token (expires in 15 minutes)'),
  refreshToken: z.string().describe('JWT refresh token (expires in 7 days)'),
})

// Generic response schemas
export const messageResponseSchema = z.object({
  message: z.string().describe('Response message'),
})

export const errorResponseSchema = z.object({
  error: z.string().describe('Error message'),
  details: z.array(z.any()).optional().describe('Validation error details'),
})

// Refresh token schema
export const refreshTokenSchema = z.object({
  refreshToken: z.string().describe('Refresh token'),
})

// Type inference
export type RegisterUserRequest = z.infer<typeof registerUserSchema>
export type LoginUserRequest = z.infer<typeof loginUserSchema>
export type ForgotPasswordRequest = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordRequest = z.infer<typeof resetPasswordSchema>
export type UserResponse = z.infer<typeof userResponseSchema>
export type AuthResponse = z.infer<typeof authResponseSchema>
export type MessageResponse = z.infer<typeof messageResponseSchema>
export type ErrorResponse = z.infer<typeof errorResponseSchema>
export type RefreshTokenRequest = z.infer<typeof refreshTokenSchema>
