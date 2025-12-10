# 🍰 QOYLLUR PASTELERÍA — Sistema de Gestión Integral  
### Proyecto Final — Aplicaciones Web  
### Universidad Tecnológica del Perú (UTP)

---

## 📌 Descripción del Sistema

**QOYLLUR Pastelería** es un sistema web completo diseñado para gestionar todas las áreas operativas de una pastelería real:

- **Gestión Comercial** (Productos, Categorías, Clientes, Pedidos)  
- **Gestión de Proveedores y Compras** (Suppliers, Purchase Orders, Purchase Details)  
- **Gestión de Producción** (Recipes, Recipe Details, Ingredients, Units)  
- **Gestión de Inventario** (Inventario y Movimientos)  
- **Gestión de Accesos e Identidad** (Login, Empleados, Roles)

El sistema incluye autenticación, control de roles, dashboard con métricas, tablas responsivas, formularios modernos y un backend simulado mediante **JSON Server**.

---

# 🛠️ Características del Sistema

### 🔐 Autenticación y roles
- Login conectado al JSON Server  
- Sesión persistente en LocalStorage  
- **AuthGuard** → Valida si el usuario está autenticado  
- **RoleGuard** → Restringe acceso según rol  
- Cada usuario ve solo los módulos permitidos

### 🧁 Gestión Comercial
- Productos y categorías  
- Clientes  
- Pedidos con cálculo automático  
- Dashboard con resumen  
- Gráfico de ventas mensual (ngx-charts)

### 🧾 Gestión de Proveedores y Compras
- CRUD de proveedores  
- Órdenes de compra  
- Detalle de compras  

### 👨‍🍳 Producción
- Recetas  
- Ingredientes  
- Unidades  
- Detalle de recetas dinámico  

### 📦 Inventario
- Control de stock  
- Movimientos IN/OUT  
- Kardex básico  

### 📱 Interfaz moderna y responsiva
- Todas las tablas adaptadas para celulares  
- Formularios 100% responsivos  
- Dashboard y cards dinámicos  
- Imágenes personalizadas por tipo de gestión  

---

# 🧱 Tecnologías Utilizadas

| Tecnología | Uso |
|-----------|-----|
| **Angular 17** | Frontend principal |
| **TypeScript** | Lógica del sistema |
| **Bootstrap 5** | UI y responsividad |
| **JSON Server** | Base de datos simulada |
| **RxJS** | Manejo de peticiones |
| **ngx-charts** | Gráfico del dashboard |
| **LocalStorage** | Sesión persistente |

---

# 📁 Estructura del Proyecto

/src
├── app
│ ├── core
│ │ ├── guards
│ │ └── services
│ ├── modules
│ │ ├── auth
│ │ ├── dashboard
│ │ ├── products
│ │ ├── categories
│ │ ├── customers
│ │ ├── orders
│ │ ├── suppliers
│ │ ├── purchases
│ │ ├── ingredients
│ │ ├── units
│ │ ├── recipes
│ │ ├── inventory
│ │ ├── employees
│ │ └── roles
│ ├── shared
│ ├── app-routing.module.ts
│ └── app.module.ts
├── assets
│ └── img
└── environments

---

# ⚙️ Requisitos Previos

Antes de instalar:

### ✔ Node.js  
https://nodejs.org/

### ✔ Angular CLI  
npm install -g @angular/cli

### ✔ JSON server
npm install -g json-server



# 📦 MANUAL DE INSTALACIÓN

### ✔ Clonar el repositorio
git clone https://github.com/tu-repo/QoyllurPasteleria.git
cd QoyllurPasteleria

### ✔ Instalar dependencias
Comando: npm install

### ✔ Iniciar JSON Server
Comando: npm run backend

# 🚀 MANUAL DE EJECUCION

### Ejecutar Angular
Comando: ng serve -o




# 📦 Información Técnica del Proyecto

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.5.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
