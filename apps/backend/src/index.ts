import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'

const app = new Hono()

// Middlewares
app.use('*', logger())
app.use('*', prettyJSON())
app.use('/api/*', cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}))

// Routes
app.get('/', (c) => {
  return c.json({
    message: '🎯 Yatta Backend API',
    version: '1.0.0',
    status: 'running',
    timestamp: new Date().toISOString()
  })
})

app.get('/api/health', (c) => {
  return c.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  })
})

app.get('/api/users', (c) => {
  const users = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com' }
  ]
  return c.json({ users })
})

app.post('/api/users', async (c) => {
  const body = await c.req.json()
  
  // Simple validation
  if (!body.name || !body.email) {
    return c.json({ error: 'Name and email are required' }, 400)
  }

  const newUser = {
    id: Date.now(),
    name: body.name,
    email: body.email,
    createdAt: new Date().toISOString()
  }

  return c.json({ user: newUser }, 201)
})

// 404 handler
app.notFound((c) => {
  return c.json({ error: 'Not Found', path: c.req.path }, 404)
})

// Error handler
app.onError((err, c) => {
  console.error('Error:', err)
  return c.json({ error: 'Internal Server Error' }, 500)
})

const port = 8000
console.log(`🚀 Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})