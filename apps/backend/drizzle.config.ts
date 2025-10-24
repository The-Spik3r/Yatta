import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'sqlite',
  schema: './src/database/schema/index.ts',
  out: './drizzle',
  dbCredentials: {
    url: './sqlite.db',
  },
  verbose: true,
  strict: true,
})
