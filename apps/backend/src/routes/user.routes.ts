import { Hono } from 'hono'
import { userController } from '../controllers'

const userRoutes = new Hono()

userRoutes.get('/', userController.getAllUsers)
userRoutes.get('/:id', userController.getUserById)
userRoutes.post('/', userController.createUser)
userRoutes.put('/:id', userController.updateUser)
userRoutes.delete('/:id', userController.deleteUser)

export { userRoutes }
