# React + Vite

🛒 Lain eCommerce - Tienda Online en React
Una aplicación completa de comercio electrónico desarrollada con React, que incluye gestión de productos, carrito de compras, autenticación de usuarios y sistema de búsqueda.

✨ Características Principales
🔐 Autenticación de Usuarios: Sistema de login con roles (admin/usuario)

🛍️ Carrito de Compras: Gestión completa con persistencia en localStorage

📦 CRUD de Productos: Crear, leer, actualizar y eliminar productos

🔍 Búsqueda en Tiempo Real: Filtrado de productos por nombre, categoría o descripción

📱 Diseño Responsive: Adaptado para móviles, tablets y escritorio

🎨 UI Moderna: Bootstrap + CSS Modules + React Toastify para notificaciones

🔧 Estado Global: Context API para gestión centralizada del estado

🚀 Instalación y Configuración
Requisitos Previos
Node.js (versión 16 o superior)

npm o yarn

Pasos de Instalación
Clonar el repositorio

bash
git clone [url-del-repositorio]
cd EntregaFinalReact
Instalar dependencias

bash
npm install
# o
yarn install
Iniciar la API de desarrollo (json-server)

bash
# En una terminal separada
npx json-server --watch db.json --port 3001
Iniciar la aplicación de React

bash
npm run dev
# o
yarn dev
Acceder a la aplicación

Frontend: http://localhost:5173

API Backend: http://localhost:3001/productos

📁 Estructura del Proyecto
text
src/
├── assets/               # Iconos SVG y recursos gráficos
├── components/           # Componentes reutilizables
│   ├── Header.jsx       # Cabecera con búsqueda y navegación
│   ├── Footer.jsx       # Pie de página
│   ├── Productos.jsx    # Listado de productos con paginación
│   ├── Carrito.jsx      # Vista del carrito de compras
│   ├── FormProducto.jsx # Formulario para CRUD de productos
│   ├── GestionProductos.jsx # Panel de administración
│   └── ...
├── contexts/            # Contextos para estado global
│   ├── AuthContext.jsx      # Autenticación
│   ├── CarritoContext.jsx   # Carrito de compras
│   ├── ProductosContext.jsx # Gestión de productos
│   └── BusquedaContext.jsx  # Búsqueda
├── pages/               # Páginas principales
│   ├── Inicio.jsx          # Página principal
│   ├── Login.jsx           # Login de usuarios
│   ├── Admin.jsx           # Panel de administración
│   └── ProductoDetalle.jsx # Detalle de producto
├── App.jsx              # Componente principal
├── main.jsx             # Punto de entrada
└── ...
🔑 Credenciales de Acceso
Usuarios de Prueba
Usuario	Contraseña	Rol	Permisos
admin	1234	Admin	Acceso completo + panel admin
maria	1234	Usuario	Compras + carrito
🛠️ Tecnologías Utilizadas
React 18 - Biblioteca principal

React Router DOM - Navegación entre páginas

Context API - Gestión de estado global

Bootstrap 5 - Framework CSS responsivo

React Toastify - Notificaciones del sistema

React Helmet Async - Gestión de SEO

React Paginate - Paginación de productos

JSON Server - API REST simulada

CSS Modules - Estilos modulares y scoped

📋 Funcionalidades Detalladas
1. Sistema de Autenticación
Login/Logout con localStorage

Rutas protegidas por roles

Tokens de sesión simulados

2. Carrito de Compras
Agregar/eliminar productos

Modificar cantidades

Cálculo automático de totales

Persistencia en localStorage

3. Gestión de Productos (Admin)
Crear: Formulario con validación completa

Leer: Listado paginado con filtros

Actualizar: Edición de productos existentes

Eliminar: Modal de confirmación con toast

4. Experiencia de Usuario
Búsqueda en tiempo real

Paginación responsive

Diseño mobile-first

Notificaciones visuales

Estados de carga y error

