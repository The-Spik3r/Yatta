import { Hono } from 'hono'
import { validator as zValidator, describeRoute } from 'hono-openapi'
import { authController } from '../controllers'
import { authMiddleware } from '../middleware'
import {
  registerUserSchema,
  loginUserSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from '../database/schema'
import { z } from 'zod'

const authRoutes = new Hono()

// Register route
authRoutes.post(
  '/register',
  describeRoute({
    tags: ['Authentication'],
    summary: 'Register a new user',
    description: 'Create a new user account with email and password',
    responses: {
      201: { description: 'User registered successfully' },
      400: { description: 'Validation error' },
      409: { description: 'Email already exists' },
    },
  }),
  zValidator('json', registerUserSchema),
  authController.register
)

// Login route
authRoutes.post(
  '/login',
  describeRoute({
    tags: ['Authentication'],
    summary: 'Login user',
    description: 'Authenticate user with email and password',
    responses: {
      200: { description: 'Login successful' },
      401: { description: 'Invalid credentials' },
    },
  }),
  zValidator('json', loginUserSchema),
  authController.login
)

// Forgot password route
authRoutes.post(
  '/forgot-password',
  describeRoute({
    tags: ['Authentication'],
    summary: 'Request password reset',
    description: 'Send password reset email to user',
    responses: {
      200: { description: 'Reset email sent (if email exists)' },
    },
  }),
  zValidator('json', forgotPasswordSchema),
  authController.forgotPassword
)

// Reset password route
authRoutes.post(
  '/reset-password',
  describeRoute({
    tags: ['Authentication'],
    summary: 'Reset password',
    description: 'Reset user password with token from email',
    responses: {
      200: { description: 'Password reset successful' },
      400: { description: 'Invalid or expired token' },
    },
  }),
  zValidator('json', resetPasswordSchema),
  authController.resetPassword
)

// Refresh token route
authRoutes.post(
  '/refresh-token',
  describeRoute({
    tags: ['Authentication'],
    summary: 'Refresh access token',
    description: 'Get new access token using refresh token',
    responses: {
      200: { description: 'Token refreshed successfully' },
      401: { description: 'Invalid refresh token' },
    },
  }),
  zValidator(
    'json',
    z.object({
      refreshToken: z.string().describe('Refresh token'),
    })
  ),
  authController.refreshToken
)

// Me route (get current user) - requires authentication
authRoutes.get(
  '/me',
  describeRoute({
    tags: ['Authentication'],
    summary: 'Get current user',
    description: 'Get current authenticated user information',
    security: [{ bearerAuth: [] }],
    responses: {
      200: { description: 'Current user information' },
      401: { description: 'Unauthorized' },
    },
  }),
  authMiddleware,
  authController.me
)

// Logout route - requires authentication
authRoutes.post(
  '/logout',
  describeRoute({
    tags: ['Authentication'],
    summary: 'Logout user',
    description: 'Logout current user (invalidate tokens)',
    security: [{ bearerAuth: [] }],
    responses: {
      200: { description: 'Logout successful' },
    },
  }),
  authMiddleware,
  authController.logout
)

export { authRoutes }
