import { Hono } from 'hono'
import { userController } from '../controllers'
import { authMiddleware, optionalAuthMiddleware } from '../middleware'

const userRoutes = new Hono()

// Protected routes - require authentication
userRoutes.get('/', authMiddleware, userController.getAllUsers)
userRoutes.get('/:id', optionalAuthMiddleware, userController.getUserById)
userRoutes.put('/:id', authMiddleware, userController.updateUser)
userRoutes.delete('/:id', authMiddleware, userController.deleteUser)

export { userRoutes }
