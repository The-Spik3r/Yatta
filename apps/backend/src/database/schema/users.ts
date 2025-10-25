import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  emailVerified: integer('email_verified', { mode: 'boolean' }).default(false),
  resetToken: text('reset_token'),
  resetTokenExpiry: text('reset_token_expiry'),
  lastLogin: text('last_login'),
  createdAt: text('created_at').notNull().default(new Date().toISOString()),
  updatedAt: text('updated_at').notNull().default(new Date().toISOString()),
})

// Zod schemas for validation
export const insertUserSchema = createInsertSchema(users, {
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

// Schema for user registration
export const registerUserSchema = insertUserSchema.pick({
  name: true,
  email: true,
  password: true,
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

export const selectUserSchema = createSelectSchema(users)

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert

// Response schemas
export const userResponseSchema = selectUserSchema.omit({
  password: true,
  resetToken: true,
  resetTokenExpiry: true,
})

export const authResponseSchema = z.object({
  user: userResponseSchema,
  accessToken: z.string().describe('JWT access token (expires in 15 minutes)'),
  refreshToken: z.string().describe('JWT refresh token (expires in 7 days)'),
})

export const messageResponseSchema = z.object({
  message: z.string().describe('Response message'),
})

export const errorResponseSchema = z.object({
  error: z.string().describe('Error message'),
  details: z.array(z.any()).optional().describe('Validation error details'),
})
