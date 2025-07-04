# Stock Inventory Demo

**Proyecto de entrevista técnica**

Esta aplicación es un **sistema de inventarios** completo con **back‑end en Django + Django REST Framework**, **front‑end en React (Vite + TypeScript)** y **orquestado con Docker Compose**. Realizada en un principio para una entrevista técncia.

---

Lo que hace esta apliación, es actuar como un gestor de inventario que recoje los datso de una BBDD en este caso nos imagenamos como si fuese un ERP del cual le viene toda la informacion (en esta demo de un docker POstre Sql) Y puede editar la cantidad y le muestra  el movoimeot nde edicion de la cantidad de cada producto en este caso.

Porque solo editaer, ya que en la mayoría de las empresas cuando les vienen los datos ya declarados de  un ERP el ID (sku en nuestro caso) es lo único que no se puede y no se devería de modificar.

## Tabla de Contenidos

1. [Visión General](#visión-general)
2. [Características](#características)
3. [Arquitectura y Stack](#arquitectura-y-stack)
4. [Estructura de Carpetas](#estructura-de-carpetas)
5. [Requisitos Previos](#requisitos-previos)
6. [Variables de Entorno](#variables-de-entorno)
7. [Instalación Manual (Local)](#instalación-manual-local)

   * [Back‑end](#back‑end)
   * [Front‑end](#front‑end)
8. [Uso con Docker Compose](#uso-con-docker-compose)
9. [Endpoints API](#endpoints-api)
10. [Autenticación (JWT)](#autenticación-jwt)
11. [Buenas Prácticas y Git Flow](#buenas-prácticas-y-git-flow)
14. [Licencia](#licencia)

---

## Visión General

En este proyecto he implementado un CRUD de **Items** y un **Historial de Movimientos de Stock** donde se registra cada ajuste de cantidad. El objetivo es demostrar:

* Diseño de **API RESTful** con Django + DRF
* Manejo de **autenticación JWT**
* **Migraciones** y **Docker Compose** para base de datos PostgreSQL
* Front‑end en **React + Vite**, usando **React Query**, **MUI** y **TypeScript**
* Funcionalidades clave: listado, edición de stock, historial con paginación
* **Testing** básico en back‑end (pytest) y front‑end (Vitest)

---

## Características

* **Back‑end**:

  * Modelos `Item` y `StockMovement` con lógica de negocio encapsulada (`adjust_quantity`).
  * Serializadores: `ItemSerializer` y `StockMovementSerializer`.
  * ViewSets y rutas DRF para CRUD y lectura de movimientos.
  * Endpoints JWT: `/api/token/` y `/api/token/refresh/`.
* **Front‑end**:

  * **Login** con formulario simple y JWT.
  * **Hooks** personalizados `useItems`, `useMovements` con TanStack Query.
  * Páginas protegidas con `RequireAuth` y navegación.
  * **MUI DataGrid** para tablas, modal de edición de stock, toasts de éxito/error.
* **DevOps**:

  * `docker-compose.yml` con servicios `db` (Postgres), `backend` (Django + Gunicorn), `frontend` (Nginx).
  * Dockerfiles optimizados en etapas (build & serve).
  * `.env.example` con variables de entorno.

---

## Arquitectura y Stack

| Capa          | Tecnología y Versión                                      |
| ------------- | --------------------------------------------------------- |
| Lenguaje      | Python 3.12, TypeScript 5.x                               |
| Back‑end      | Django 5.2.3, Django REST Framework 3.x, psycopg\[binary] |
| Front‑end     | React 19.x, Vite 4.x, React Query 4.x, MUI 5.x            |
| Base datos    | PostgreSQL 15                                             |
| Contenedores  | Docker, Docker Compose 3.9                                |
| Autenticación | JWT (djangorestframework-simplejwt)                       |           
| Lint & Format | ruff, black, isort / eslint, prettier                     |

---

## Estructura de Carpetas

```
stock-inventory-demo/
├── backend/                # Django project & app
│   ├── config/            # settings, urls, wsgi/asgi
│   ├── inventory/         # app: models, serializers, views, urls
│   ├── manage.py
│   └── Dockerfile         # build de backend
├── frontend/              # React + Vite
│   ├── src/
│   ├── public/
│   └── Dockerfile         # build + nginx
├── docker-compose.yml     # orquestación completa
├── .env.example           # variables de entorno
└── README.md
```

---

## Requisitos Previos

* **Local**:

  * Python 3.12+
  * Node.js 20+
  * npm o pnpm
  * PostgreSQL (opcional, si no se usa Docker)
* **Docker**:

  * Docker Engine
  * Docker Compose

---

## Variables de Entorno

Crea un `.env` a partir de `.env.example`:

```dotenv
# DB
DB_NAME=stockdb
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_PORT=5432

# Django
SECRET_KEY=changeme-in-prod
DEBUG=True

# Front‑end
VITE_API_URL=http://localhost:8000/api
```

---

## Instalación Manual (Local)

### Back‑end

```bash
cd backend
python -m venv .venv
source .venv/bin/activate      # Windows: .venv\Scripts\activate
pip install -r requirements.txt
# Crear superusuario temporal:
python manage.py migrate
python manage.py createsuperuser
# Levantar server:
python manage.py runserver
```

### Front‑end

```bash
cd frontend
npm install                    # o pnpm install
npm run dev
```

Visita `http://localhost:3000` (o el puerto que indique Vite).

---

## Uso con Docker Compose

```bash
# Reconstruir servicios
docker compose build --no-cache

# Levantar todo (modo attached)
docker compose up

# Levantar en background (detached)
docker compose up -d

# Ver estado
docker compose ps

# Parar
docker compose down
```

Accede a:

* Front‑end: `http://localhost:5173`
* Back‑end (DRF): `http://localhost:8000/api/`

---

## Endpoints API

| Método | Ruta                  | Descripción                      |
| ------ | --------------------- | -------------------------------- |
| POST   | `/api/token/`         | Obtener JWT (username, password) |
| POST   | `/api/token/refresh/` | Refrescar token                  |
| GET    | `/api/items/`         | Listar items (Auth required)     |
| POST   | `/api/items/`         | Crear item (Auth required)       |
| PATCH  | `/api/items/:id/`     | Ajustar quantity (Auth required) |
| GET    | `/api/movements/`     | Historial movimientos (Auth)     |

---

## Autenticación (JWT)

* Se utiliza `djangorestframework-simplejwt`.
* Flujo:

  1. POST `/api/token/` → `{ access, refresh }`
  2. En front‑end se guarda `access` en `localStorage`.
  3. Axios interceptor añade header `Authorization: Bearer <token>`.

---


## Buenas Prácticas y Git Flow

* **Ramas**: `main`, `dev/bootstrap`, `backend/models`, `backend/api`, `front/inventory`.
* **Commits**: usar convenciones `chore:`, `feat:`, `fix:`, `test:`.
* Antes de mergear a `main`:

  1. Pull request con revisión.
  2. CI local pasa tests y lint.
  3. Merge limpio sin conflictos.

---


## Licencia

Este repositorio está bajo la licencia MIT. Véase el archivo [LICENSE](LICENSE) para más detalles.

---

Daniel Labrador Benito
