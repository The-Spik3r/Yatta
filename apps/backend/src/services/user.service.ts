import { UserRepository, type IUserRepository } from '../repositories'
import { insertUserSchema, type User, type NewUser } from '../database/schema'
import { z } from 'zod'

export interface IUserService {
  getAllUsers(): Promise<User[]>
  getUserById(id: number): Promise<User | null>
  getUserByEmail(email: string): Promise<User | null>
  createUser(userData: NewUser): Promise<User>
  updateUser(id: number, userData: Partial<NewUser>): Promise<User | null>
  deleteUser(id: number): Promise<boolean>
}

export class UserService implements IUserService {
  constructor(private userRepository: IUserRepository) {}

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.findAll()
  }

  async getUserById(id: number): Promise<User | null> {
    if (id <= 0) {
      throw new Error('Invalid user ID')
    }

    const user = await this.userRepository.findById(id)
    return user || null
  }

  async getUserByEmail(email: string): Promise<User | null> {
    if (!email) {
      throw new Error('Email is required')
    }

    const user = await this.userRepository.findByEmail(email)
    return user || null
  }

  async createUser(userData: NewUser): Promise<User> {
    const validatedData = insertUserSchema.parse(userData)

    const existingUser = await this.userRepository.findByEmail(
      validatedData.email
    )
    if (existingUser) {
      throw new Error('User with this email already exists')
    }

    return await this.userRepository.create(validatedData)
  }

  async updateUser(
    id: number,
    userData: Partial<NewUser>
  ): Promise<User | null> {
    if (id <= 0) {
      throw new Error('Invalid user ID')
    }

    const existingUser = await this.userRepository.findById(id)
    if (!existingUser) {
      return null
    }

    if (userData.email && userData.email !== existingUser.email) {
      const emailUser = await this.userRepository.findByEmail(userData.email)
      if (emailUser && emailUser.id !== id) {
        throw new Error('User with this email already exists')
      }
    }

    if (userData.name !== undefined || userData.email !== undefined) {
      const partialSchema = insertUserSchema.partial()
      partialSchema.parse(userData)
    }

    const updatedUser = await this.userRepository.update(id, userData)
    return updatedUser || null
  }

  async deleteUser(id: number): Promise<boolean> {
    if (id <= 0) {
      throw new Error('Invalid user ID')
    }

    return await this.userRepository.delete(id)
  }
}

const userRepository = new UserRepository()
export const userService = new UserService(userRepository)
