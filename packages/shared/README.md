# Yatta Shared

Paquete compartido con tipos, utilidades y configuraciones para el monorepo Yatta.

## Características

- 📘 **TypeScript** - Tipos compartidos entre aplicaciones
- 🛠️ **Utilidades** - Funciones comunes reutilizables
- 📦 **Exportaciones modulares** - Importa solo lo que necesitas

## Estructura

```
src/
├── types/
│   ├── api.ts       # Tipos para API y respuestas
│   └── index.ts     # Exportaciones de tipos
├── utils/
│   ├── common.ts    # Utilidades comunes
│   └── index.ts     # Exportaciones de utils
└── index.ts         # Punto de entrada principal
```

## Uso

```typescript
// Importar tipos
import { User, ApiResponse } from '@yatta/shared'

// Importar utilidades
import { formatDate, isValidEmail } from '@yatta/shared'

// Importar específicamente
import { User } from '@yatta/shared/types'
import { formatDate } from '@yatta/shared/utils'
```

## Desarrollo

```bash
# Build para distribución
npm run build

# Modo watch para desarrollo
npm run dev

# Type checking
npm run type-check
```