# 🎮 Pokemon Game

Juego interactivo de "¿Quién es ese Pokémon?" desarrollado con Vue 3 y TypeScript. Los jugadores deben adivinar el Pokémon correcto a partir de su silueta, seleccionando entre múltiples opciones.

## ✨ Características

- 🎯 Interfaz interactiva e intuitiva
- 🎨 Diseño responsive con TailwindCSS
- 🎊 Efectos visuales con animaciones y confetti
- 🧪 Cobertura completa de unit tests con Vitest
- 📱 Totalmente responsive
- 🔄 Consumo de API de Pokémon en tiempo real

## 🛠️ Tecnologías Utilizadas

- **Vue 3** - Framework progresivo de JavaScript
- **TypeScript** - Tipado estático para JavaScript
- **Vite** - Build tool de nueva generación
- **TailwindCSS** - Framework CSS utility-first
- **Axios** - Cliente HTTP para consumo de API
- **Vitest** - Framework de testing unitario
- **Canvas Confetti** - Efectos visuales de celebración
- **Vue Test Utils** - Utilidades de testing para Vue

## 🚀 Instalación y Uso

### Prerrequisitos

- Node.js `^20.19.0 || >=22.12.0`

### Instalación

```sh
npm install
```

### Desarrollo

```sh
npm run dev
```

### Build para Producción

```sh
npm run build
```

### Ejecutar Tests

```sh
npm run test:unit
```

### Linting

```sh
npm run lint
```

## 📁 Estructura del Proyecto

```
src/
├── modules/
│   └── pokemon/
│       ├── api/          # Servicios de API
│       ├── components/   # Componentes de Vue
│       ├── composables/  # Lógica reutilizable
│       ├── interfaces/   # Tipos de TypeScript
│       └── pages/        # Vistas principales
└── assets/              # Estilos y recursos
```

## 🧪 Testing

El proyecto cuenta con una suite completa de unit tests utilizando Vitest y Vue Test Utils, cubriendo:
- Componentes
- Composables
- Servicios de API
- Interfaces y tipos

---

**Desarrollado con ❤️ usando Vue 3 + TypeScript**
