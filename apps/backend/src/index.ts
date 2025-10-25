import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'
import { apiReference } from '@scalar/hono-api-reference'
import { generateSpecs } from 'hono-openapi'
import { userRoutes, authRoutes } from './routes'

const app = new Hono()

// Configure OpenAPI documentation using hono-openapi
app.get('/doc', async c => {
  const specs = await generateSpecs(app, {
    documentation: {
      info: {
        title: 'Yatta API',
        version: '1.0.0',
        description:
          'Backend API para la aplicación Yatta con autenticación y gestión de usuarios',
      },
      servers: [
        {
          url: 'http://localhost:8000',
          description: 'Servidor de desarrollo',
        },
      ],
      tags: [
        {
          name: 'Authentication',
          description: 'Endpoints para autenticación de usuarios',
        },
        {
          name: 'Users',
          description: 'Endpoints para gestión de usuarios',
        },
        {
          name: 'Health',
          description: 'Endpoints para verificar el estado del servidor',
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            description: 'Token JWT para autenticación',
          },
        },
      },
    },
  })
  return c.json(specs)
})

// Middlewares
app.use('*', logger())
app.use('*', prettyJSON())
app.use(
  '/api/*',
  cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
  })
)

// Documentation route with Scalar
app.get(
  '/reference',
  apiReference({
    theme: 'kepler',
    layout: 'modern',
    defaultOpenAllTags: true,
    showSidebar: true,
    hideSearch: false,
    expandAllResponses: false,
    operationTitleSource: 'summary',
    tagsSorter: 'alpha',
    spec: {
      url: '/doc',
    },
  })
)

// Routes
app.get('/', c => {
  return c.json({
    message: '🎯 Yatta Backend API',
    version: '1.0.0',
    status: 'running',
    timestamp: new Date().toISOString(),
  })
})

app.get('/api/health', c => {
  return c.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  })
})

// API Routes
app.route('/api/auth', authRoutes)
app.route('/api/users', userRoutes)

// 404 handler
app.notFound(c => {
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
  port,
})
