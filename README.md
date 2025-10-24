# Yatta TurboRepo

Un monorepo moderno construido con TurboRepo que contiene:

## Aplicaciones

- **Client** (`apps/client`): Aplicación React con Vite y TypeScript
- **Backend** (`apps/backend`): API REST con Hono y TypeScript

## Paquetes

- **Shared** (`packages/shared`): Tipos, utilidades y configuraciones compartidas

## Tecnologías

- 🏎️ [TurboRepo](https://turbo.build/) - Build system y monorepo
- ⚛️ [React](https://reactjs.org/) - Frontend framework
- ⚡ [Vite](https://vitejs.dev/) - Build tool para desarrollo rápido
- 🔥 [Hono](https://hono.dev/) - Framework web ultrarrápido
- 📘 [TypeScript](https://www.typescriptlang.org/) - Tipado estático
- 📦 [NPM Workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces) - Gestión de dependencias

## Estructura del proyecto

```
yatta-monorepo/
├── apps/
│   ├── client/          # React + Vite app
│   └── backend/         # Hono API
├── packages/
│   └── shared/          # Shared utilities and types
├── package.json
├── turbo.json
└── README.md
```

## Instalación

```bash
# Instalar dependencias
npm install

# Desarrollo - ejecutar todas las aplicaciones
npm run dev

# Build - construir todas las aplicaciones
npm run build

# Lint - ejecutar linting en todos los paquetes
npm run lint

# Test - ejecutar tests en todos los paquetes
npm run test
```

## Desarrollo

### Cliente (React + Vite)
```bash
cd apps/client
npm run dev
```

### Backend (Hono)
```bash
cd apps/backend
npm run dev
```

## Comandos útiles

- `npm run clean` - Limpiar todas las builds
- `npm run format` - Formatear código con Prettier
- `npm run type-check` - Verificar tipos de TypeScript

## Scripts disponibles

Todos los scripts están configurados para ejecutarse en paralelo en todos los paquetes usando TurboRepo:

- `dev` - Modo desarrollo con hot reload
- `build` - Construir para producción
- `lint` - Ejecutar ESLint
- `test` - Ejecutar tests
- `type-check` - Verificar tipos TypeScript