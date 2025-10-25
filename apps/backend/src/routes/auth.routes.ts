import { Hono } from 'hono'
import { authController } from '../controllers'

const authRoutes = new Hono()

// Authentication routes
authRoutes.post('/register', authController.register)
authRoutes.post('/login', authController.login)
authRoutes.post('/forgot-password', authController.forgotPassword)
authRoutes.post('/reset-password', authController.resetPassword)
authRoutes.post('/refresh-token', authController.refreshToken)
authRoutes.post('/logout', authController.logout)

export { authRoutes }
