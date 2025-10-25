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
  updateLastLogin(id: number): Promise<void>
  updateResetToken(email: string, token: string, expiry: string): Promise<void>
  findByResetToken(token: string): Promise<User | undefined>
  clearResetToken(id: number): Promise<void>
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

  async updateLastLogin(id: number): Promise<void> {
    await db
      .update(users)
      .set({ lastLogin: new Date().toISOString() })
      .where(eq(users.id, id))
  }

  async updateResetToken(
    email: string,
    token: string,
    expiry: string
  ): Promise<void> {
    await db
      .update(users)
      .set({
        resetToken: token,
        resetTokenExpiry: expiry,
        updatedAt: new Date().toISOString(),
      })
      .where(eq(users.email, email))
  }

  async findByResetToken(token: string): Promise<User | undefined> {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.resetToken, token))
    return result[0]
  }

  async clearResetToken(id: number): Promise<void> {
    await db
      .update(users)
      .set({
        resetToken: null,
        resetTokenExpiry: null,
        updatedAt: new Date().toISOString(),
      })
      .where(eq(users.id, id))
  }
}
