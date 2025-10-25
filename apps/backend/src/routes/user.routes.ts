import { Hono } from 'hono'
import { validator as zValidator, describeRoute } from 'hono-openapi'
import { userController } from '../controllers'
import { authMiddleware, optionalAuthMiddleware } from '../middleware'
import { insertUserSchema } from '../database/schema'

const userRoutes = new Hono()

// Get all users (requires authentication)
userRoutes.get(
  '/',
  describeRoute({
    tags: ['Users'],
    summary: 'Get all users',
    description: 'Retrieve a list of all users (requires authentication)',
    security: [{ bearerAuth: [] }],
    responses: {
      200: { description: 'List of users' },
      401: { description: 'Unauthorized' },
    },
  }),
  authMiddleware,
  userController.getAllUsers
)

// Get user by ID (optional authentication)
userRoutes.get(
  '/:id',
  describeRoute({
    tags: ['Users'],
    summary: 'Get user by ID',
    description: 'Retrieve a specific user by their ID',
    responses: {
      200: { description: 'User found' },
      400: { description: 'Invalid user ID' },
      404: { description: 'User not found' },
    },
  }),
  optionalAuthMiddleware,
  userController.getUserById
)

// Update user (requires authentication and validation)
userRoutes.put(
  '/:id',
  describeRoute({
    tags: ['Users'],
    summary: 'Update user',
    description:
      'Update user information (requires authentication and ownership or admin privileges)',
    security: [{ bearerAuth: [] }],
    responses: {
      200: { description: 'User updated successfully' },
      400: { description: 'Invalid user ID or validation error' },
      401: { description: 'Unauthorized' },
      403: { description: 'Forbidden - insufficient permissions' },
      404: { description: 'User not found' },
    },
  }),
  authMiddleware,
  zValidator('json', insertUserSchema.omit({ password: true }).partial()),
  userController.updateUser
)

// Delete user (requires authentication)
userRoutes.delete(
  '/:id',
  describeRoute({
    tags: ['Users'],
    summary: 'Delete user',
    description:
      'Delete a user account (requires authentication and ownership or admin privileges)',
    security: [{ bearerAuth: [] }],
    responses: {
      200: { description: 'User deleted successfully' },
      400: { description: 'Invalid user ID' },
      401: { description: 'Unauthorized' },
      403: { description: 'Forbidden - insufficient permissions' },
      404: { description: 'User not found' },
    },
  }),
  authMiddleware,
  userController.deleteUser
)

export { userRoutes }
