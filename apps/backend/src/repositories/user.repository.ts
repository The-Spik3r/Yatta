import { eq } from 'drizzle-orm'
import { db } from '../database'
import { users, type User, type NewUser } from '../database/schema'

export interface IUserRepository {
  findAll(): Promise<User[]>
  findById(id: number): Promise<User | undefined>
  findByEmail(email: string): Promise<User | undefined>
  create(user: NewUser): Promise<User>
  update(id: number, user: Partial<NewUser>): Promise<User | undefined>
  delete(id: number): Promise<boolean>
}

export class UserRepository implements IUserRepository {
  async findAll(): Promise<User[]> {
    return await db.select().from(users)
  }

  async findById(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id))
    return result[0]
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.email, email))
    return result[0]
  }

  async create(user: NewUser): Promise<User> {
    const now = new Date().toISOString()
    const userWithTimestamps = {
      ...user,
      createdAt: now,
      updatedAt: now,
    }

    const result = await db.insert(users).values(userWithTimestamps).returning()
    return result[0]
  }

  async update(
    id: number,
    userData: Partial<NewUser>
  ): Promise<User | undefined> {
    const updatedUser = {
      ...userData,
      updatedAt: new Date().toISOString(),
    }

    const result = await db
      .update(users)
      .set(updatedUser)
      .where(eq(users.id, id))
      .returning()

    return result[0]
  }

  async delete(id: number): Promise<boolean> {
    const result = await db.delete(users).where(eq(users.id, id)).returning()
    return result.length > 0
  }
}
