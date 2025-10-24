# Yatta Backend

API REST construida con Hono y TypeScript.

## Características

- 🔥 **Hono** - Framework web ultrarrápido
- 📘 **TypeScript** - Tipado estático completo
- 🔄 **Hot Reload** - Desarrollo con recarga automática
- 🌐 **CORS** - Configurado para desarrollo local
- 📝 **Logging** - Middleware de logging integrado
- ✨ **Pretty JSON** - Respuestas JSON formateadas

## Endpoints disponibles

### General
- `GET /` - Información de la API
- `GET /api/health` - Health check

### Users
- `GET /api/users` - Obtener lista de usuarios
- `POST /api/users` - Crear nuevo usuario

## Desarrollo

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Build para producción
npm run build

# Ejecutar en producción
npm start
```

El servidor se ejecuta en `http://localhost:8000`