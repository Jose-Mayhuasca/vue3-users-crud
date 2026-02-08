# User Management Dashboard

Una aplicación Single Page Application (SPA) robusta para la gestión de usuarios, construida con **Vue 3** y el ecosistema moderno de JavaScript.

Este proyecto se enfoca en la **integridad de datos**, una **arquitectura escalable** y una **experiencia de usuario (UX)** fluida, implementando validaciones complejas y manejo de estado centralizado.

## Tecnologías

- **Framework:** Vue 3 (Composition API + Script Setup)
- **Lenguaje:** TypeScript (Strict typing)
- **Build Tool:** Vite
- **UI Components:** PrimeVue
- **State Management:** Pinia
- **Form Validation:** VeeValidate + Zod
- **CSS:** Sass (SCSS) (Sin dependencias de Tailwind)

## Características Destacadas

### 1. Gestión de Estado con Pinia

- Store centralizado (`userStore`) para operaciones CRUD.
- Lógica de negocio desacoplada de la vista.

### 2. Validaciones de Alto Nivel (Zod)

- **Validación de Duplicados en Tiempo Real:** El formulario detecta si un `username`, `email` o `phone` ya existe en el estado global antes de enviar.
- **Case-Insensitivity:** El sistema normaliza datos (ej: `User` vs `user`) para evitar duplicados fantasma.
- **Validación Contextual:** Permite editar un usuario manteniendo sus propios datos sin disparar errores de duplicidad.

### 3. Arquitectura Limpia

- **`src/validations/`:** Reglas de validación Zod reutilizables y componibles.
- **`src/utils/`:** Funciones puras para formateo de datos (ej: pipelines de limpieza de teléfonos).
- **`src/stores/`:** Lógica de negocio y estado.

### 4. Manejo de Datos Complejos

- **Formateo de Teléfonos:** Pipeline personalizado que limpia extensiones (`x1234`), paréntesis y guiones para guardar datos limpios y mostrarlos uniformemente.
- **Feedback Visual:** Uso de Toasts para notificaciones de éxito/error y validación reactiva en cada input.

## Estructura del Proyecto

```text
src/
├── assets/           # Estilos globales (Sass) y recursos estáticos
├── components/       # Componentes de UI reutilizables (UserFormModal, UserTable)
├── interfaces/       # Definiciones de tipos TypeScript (User.ts)
├── router/           # Configuración de rutas (Vue Router)
├── services/         # Lógica de comunicación con APIs (UserService.ts)
├── stores/           # Estado global con Pinia (userStore.ts)
├── utils/            # Funciones auxiliares y formateadores
├── validations/      # Schemas de validación con Zod
├── views/            # Vistas/Páginas principales
├── App.vue           # Componente raíz
└── main.ts           # Punto de entrada de la aplicación
```

## Cómo ejecutar el proyecto

### 1. **Instalar dependencias:**

    npm install

### 2. **Iniciar servidor de desarrollo:**

    npm run dev

### 3. **Construir para producción:**

    npm run build

## Decisiones Técnicas

### ¿Por qué mostrar el ID en la tabla?

Aunque en vistas públicas se oculta, en un panel administrativo el ID es crítico para identificar registros unívocamente y reportar incidencias.

### Estrategia de Validación

Se optó por **Zod** sobre validaciones simples de HTML5 para permitir refinamientos personalizados (`.refine()`) que cruzan datos contra el Store de **Pinia** para asegurar unicidad y consistencia en los datos.

### Manejo de Formularios

Se utilizó **VeeValidate** con la estrategia `defineField` para conectar los inputs de **PrimeVue** sin perder la reactividad ni la validación "onBlur", manteniendo el código limpio y mantenible.

---

Desarrollado con ❤️ y Vue.js
