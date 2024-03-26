![Badge License](https://img.shields.io/badge/license-not%20specified-lightgrey)
![Badge Release](https://img.shields.io/badge/release%20date-mar%202024-green)

# Lemon Challenge

Proyecto desarrollado para el desafío técnico de Lemon.

## Indice

- [Requisitos previos](#requisitos-previos)
- [Instalación](#instalación)
- [Variables de entorno](#variables-de-entorno)
- [Ejecución](#ejecución)
- [Comandos aternativos](#comandos-alternativos)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Aclaraciones](#aclaraciones)

## Requisitos previos

Debe tener instalado lo siguiente:

- Node.js: Puedes descargar la versión LTS más reciente desde el sitio web oficial de Node.js: https://nodejs.org
- React Native CLI: Ejecutando el siguiente comando: `npm install -g react-native-cli`
- Yarn: Puedes descargar la última versión de Yarn desde su sitio web oficial: https://yarnpkg.com/lang/en/docs/install/

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/jonameschi/lemon-wallet
cd lemon-wallet

# Instalar las dependencias
yarn install
yarn pod:install
```

## Variables de entorno

Deje seteadas mis api key para que puedan usar el Google SignIn y la API de CoinMarket.

## Ejecución

```bash
# Iniciar la aplicación
yarn start
```

Y luego

```bash
# Iniciar la aplicación en iOS
yarn ios

# Iniciar la aplicación en Android
yarn android
```

## Comandos aternativos

```bash
# validaciones de lint
yarn lint

# validaciones de typescript
yarn typescript

# ejecución de tests
yarn test

# ejecución de tests con coverage
yarn test:coverage
```

## Estructura del proyecto

```bash
├── src/ # Código fuente
│ ├── api/ #Logica de llamada a API y tipos
│ ├── components/ # Componentes de la app
│ ├── helpers/ # Funciones de ayuda
│ ├── hooks/ # Custom hooks
│ ├── locales/ # configuracion de internacionalizacion (i18n)
│ ├── navigation/ # Tipado de navegaciones
│ ├── screens/ # Pantallas de la aplicación
│ └── theme/ # Configuracion de themes
├── __mocks__/ # mocks para unit test
├── assets/ # Recursos estáticos (imágenes)
├── types/ # Types globales y declarations.
├── App.tsx # Archivo inicial de la aplicación donde se encuentra el stack de navegación
└── ...
```

## Aclaraciones

Incluí las siguientes screens:

- Login: Pantalla de inicio de sesión con Google SignIn.
- Home: Pantalla principal con el listado de criptomonedas, con la posibilidad de filtrar, agregar a favoritos y ver el detalle de cada una.
- Detail: Pantalla de detalle de la criptomoneda seleccionada, con un grafico de la evolucion de los ultimos 30 dias (informacion random, ya que la API no me permitió obtener esa informacion con la key que tengo). Y haciendo pull to refresh se actualiza la informacion.

Hay varios unit test, priorice realizar al menos un test sobre componentes, hooks y screens. El de la screen Home esta probado en su totalidad,no logré por falta de tiempo hacer los test con maestro.

## Librerías y Herramientas Utilizadas

### Navegación

- **React Navigation (`@react-navigation/native`, `@react-navigation/native-stack`, `react-native-screens`)**

### Internacionalización

- **i18next (`i18next`), React-i18next (`react-i18next`)**

### Gestión de Estado y Caché

- **Zustand (`zustand`)**
- **React Query (`react-query`)**
- **Storage (`react-native-mmkv`)**

### Autenticación

- **Google Sign-In (`@react-native-google-signin/google-signin`)**

### Optimización de Imágenes

- **FastImage (`react-native-fast-image`)**

### UI y Animaciones

- **Varias librerías (`react-native-gesture-handler`, `react-native-reanimated`, `react-native-safe-area-context`)**

### Gráficos y SVG

- **React Native SVG (`react-native-svg`, `react-native-svg-transformer`)**
- **Victory Native (`victory-native`, `react-native-skia`)**

### Configuración y Variables de Entorno

- **React Native Config (`react-native-config`)**

### Testing

- **Jest (`jest`), Testing Library (`@testing-library/react-native`, `@testing-library/react-hooks`)**

### Linting y Formateo de Código

- **ESLint (`eslint`), Prettier (`prettier`)**
