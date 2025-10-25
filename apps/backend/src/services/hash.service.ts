import bcrypt from 'bcryptjs'

export class HashService {
  private readonly saltRounds = 12

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds)
  }

  async comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword)
  }
}

export const hashService = new HashService()
