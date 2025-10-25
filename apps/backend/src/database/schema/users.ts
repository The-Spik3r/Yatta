import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
// Import shared schemas
import {
  registerUserSchema,
  loginUserSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  userResponseSchema,
  authResponseSchema,
  messageResponseSchema,
  errorResponseSchema,
} from '@yatta/shared'

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

export const selectUserSchema = createSelectSchema(users)

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert

// Re-export shared schemas for convenience
export {
  registerUserSchema,
  loginUserSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  userResponseSchema,
  authResponseSchema,
  messageResponseSchema,
  errorResponseSchema,
}
