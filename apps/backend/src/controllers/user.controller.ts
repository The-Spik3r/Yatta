import { Context } from 'hono'
import { userService, type IUserService } from '../services'
import { z } from 'zod'

export class UserController {
  constructor(private userService: IUserService) {}

  getAllUsers = async (c: Context) => {
    try {
      const users = await this.userService.getAllUsers()
      return c.json({ users })
    } catch (error) {
      console.error('Error getting users:', error)
      return c.json({ error: 'Internal server error' }, 500)
    }
  }

  getUserById = async (c: Context) => {
    try {
      const id = parseInt(c.req.param('id'))

      if (isNaN(id)) {
        return c.json({ error: 'Invalid user ID' }, 400)
      }

      const user = await this.userService.getUserById(id)

      if (!user) {
        return c.json({ error: 'User not found' }, 404)
      }

      return c.json({ user })
    } catch (error) {
      console.error('Error getting user by ID:', error)

      if (error instanceof Error && error.message === 'Invalid user ID') {
        return c.json({ error: error.message }, 400)
      }

      return c.json({ error: 'Internal server error' }, 500)
    }
  }

  createUser = async (c: Context) => {
    try {
      const body = await c.req.json()

      const user = await this.userService.createUser(body)
      return c.json({ user }, 201)
    } catch (error) {
      console.error('Error creating user:', error)

      if (error instanceof z.ZodError) {
        return c.json(
          {
            error: 'Validation error',
            details: error.issues,
          },
          400
        )
      }

      if (error instanceof Error) {
        if (error.message.includes('already exists')) {
          return c.json({ error: error.message }, 409)
        }
        if (error.message.includes('required')) {
          return c.json({ error: error.message }, 400)
        }
      }

      return c.json({ error: 'Internal server error' }, 500)
    }
  }

  updateUser = async (c: Context) => {
    try {
      const id = parseInt(c.req.param('id'))

      if (isNaN(id)) {
        return c.json({ error: 'Invalid user ID' }, 400)
      }

      const body = await c.req.json()

      const user = await this.userService.updateUser(id, body)

      if (!user) {
        return c.json({ error: 'User not found' }, 404)
      }

      return c.json({ user })
    } catch (error) {
      console.error('Error updating user:', error)

      if (error instanceof z.ZodError) {
        return c.json(
          {
            error: 'Validation error',
            details: error.issues,
          },
          400
        )
      }

      if (error instanceof Error) {
        if (error.message.includes('already exists')) {
          return c.json({ error: error.message }, 409)
        }
        if (error.message.includes('Invalid user ID')) {
          return c.json({ error: error.message }, 400)
        }
      }

      return c.json({ error: 'Internal server error' }, 500)
    }
  }

  deleteUser = async (c: Context) => {
    try {
      const id = parseInt(c.req.param('id'))

      if (isNaN(id)) {
        return c.json({ error: 'Invalid user ID' }, 400)
      }

      const deleted = await this.userService.deleteUser(id)

      if (!deleted) {
        return c.json({ error: 'User not found' }, 404)
      }

      return c.json({ message: 'User deleted successfully' })
    } catch (error) {
      console.error('Error deleting user:', error)

      if (error instanceof Error && error.message === 'Invalid user ID') {
        return c.json({ error: error.message }, 400)
      }

      return c.json({ error: 'Internal server error' }, 500)
    }
  }
}

// Create controller instance
export const userController = new UserController(userService)
