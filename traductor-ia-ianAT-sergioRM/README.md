## 🌍 Traductor Inteligente (es / en / fr)

Aplicación que traduce textos entre Español, Inglés y Francés, integrada con Ollama como IA local y SQLite3 como base de datos para tener un historial de traducciones.

El proyecto tiene:

- Backend en `Node.js + Express` que expone una API REST y se conecta a Ollama.
- Base de datos `SQLite3` gestionada con better-sqlite3.
- Frontend en JavaScript que consume la API y muestra historial.
- Docker Compose para levantar backend, frontend y servicio de Ollama.

## 👥 Autores

- **Ian Álvarez Triviño**
- **Sergio Ramírez Morón**

## 🧩 Requisitos del sistema

- **Node.js**: v20+
- **npm**: v10+
- **Docker**: 24+
- **Docker Compose**: V2
- **Ollama** instalado localmente con un modelo de lenguaje:
  - **Modelo**: `mistral`

## 📁 Estructura de carpetas

```text
traductor-ia-IanAT-SergioRM/
│
├── backend/
│   ├── server.js        # Servidor Express
│   ├── routes.js        # Rutas de la API REST
│   ├── services.js      # Lógica con Ollama y acceso a la BD
│   ├── db.js            # Inicialización y conexión SQLite3
│   ├── db/
│   │   └── traducciones.db  # Base de datos SQLite3
│   ├── Dockerfile       # Imagen Docker del backend
│   ├── .dockerignore    # Archivos que Docker va a ignorar
│   ├── package.json     # Dependencias y scripts del backend
│   └── package-lock.json
│
├── frontend/
│   ├── index.html       # Interfaz principal del traductor
│   ├── style.css        # Estilos CSS
│   ├── main.js          # Lógica de interacción con la API y UI
│   ├── Dockerfile       # Imagen Docker del frontend
│   └── images/          # Capturas de pantalla
│
├── validacion.http       # Peticiones de prueba a la API
├── docker-compose.yml    # Docker compose del backend, frontend y Ollama
├── docs/
│   └── checklist.md      # Checklist
├── README.md             # Descripción del documento
```

---

## ⚙️ Tecnologías principales

- **Backend**:
  - `Node.js`, `Express`
  - `better-sqlite3`
  - `dotenv`, `cors`
- **Frontend**:
  - HTML, CSS
  - JavaScript con fetch para consumir la API
- **IA**:
  - **Ollama** con modelo mistral
- **Estrucura Final**:
  - Docker + Docker Compose

---

## 📥 Instalación

### 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd traductor-ia-IanAT-SergioRM
```

### 2. Configurar `.env`

```bash
cp .env.example .env
```

### 2. Instalar modelo mistral

```bash
ollama pull mistral
```

## ▶️ Ejecución sin Docker

### 1. Lanzar Ollama

En una terminal:

```bash
ollama serve
```

### 2. Lanzar backend

En otra terminal:

```bash
cd backend
npm run dev
```

- El backend escucha al puerto definido en `PORT`.

### 3. Lanzar frontend

El frontend es estático, por lo que se recomienda abrirlo con liveServer o abrirlo en el navegador directamente.

- **Recomendación**: servirlo con un servidor estático (extensión Live Server):

Ell frontend llama a las siguientes URL por defecto:

- `http://localhost:3000/api/translate`
- `http://localhost:3000/api/translations`

Asegúrate de que el backend esté corriendo en ese puerto, si no, no funcionará.


## 🌐 API REST – Endpoints

Todos los endpoints tienen un `/api` delante.

### GET `/api/health`

- **Objetivo**: Comprobar que el backend está levantado y ver la URL de Ollama.

**Respuesta (200):**

```json
{
  "status": "ok",
  "ollama": "http://localhost:11434"
}
```

---

### POST `/api/translate`

- **Objetivo**: Traducir un texto usando Ollama y guardar la traducción en la base de datos.

**Body:**

```json
{
  "text": "Hola mundo",
  "sourceLang": "es",
  "targetLang": "en"
}
```

**Validaciones:**

- **`text`**:
  - No puede estar vacío ni ser solo espacios.
  - Máximo 5000 caracteres.
- **`sourceLang` y `targetLang`**:
  - Deben ser uno entre: `"es"`, `"en"`, `"fr"`.
  - No pueden ser iguales.

**Respuesta (200) ejemplo:**

```json
{
  "id": 1,
  "texto_original": "Hola mundo",
  "idioma_origen": "es",
  "idioma_destino": "en",
  "texto_traducido": "Hello world",
  "modelo": "mistral",
  "duracion_ms": 2500
}
```

---

### GET `/api/translations`

- **Objetivo**: Obtener el historial de traducciones.

**Parámetros:**

- `sourceLang` – Filtrar por idioma origen (`es`, `en`, `fr`).
- `targetLang` – Filtrar por idioma destino (`es`, `en`, `fr`).

**Ejemplos de uso:**

- `GET /api/translations` → Todas las traducciones.
- `GET /api/translations?sourceLang=es` → Solo traducciones que salen de español.
- `GET /api/translations?targetLang=en` → Solo traducciones que van a inglés.
- `GET /api/translations?sourceLang=es&targetLang=en` → Solo traducciones que van del español al inglés.

**Respuesta (200) ejemplo:**

```json
[
  {
    "id": 3,
    "texto_original": "Bonjour",
    "texto_traducido": "Hello",
    "idioma_origen": "fr",
    "idioma_destino": "en",
    "modelo": "mistral",
    "duracion_ms": 1300,
    "created_at": "2025-12-04 10:23:45"
  }
]
```

---

### GET `/api/translations/:id`

- **Objetivo**: Obtener una traducción por su `id`.

**Ejemplo:**

```http
GET /api/translations/1
```

**Respuesta (200) ejemplo:**

```json
{
  "id": 1,
  "texto_original": "Hola mundo",
  "texto_traducido": "Hello world",
  "idioma_origen": "es",
  "idioma_destino": "en",
  "modelo": "mistral",
  "duracion_ms": 2500,
  "created_at": "2025-12-04 09:15:00"
}
```

---

### DELETE `/api/translations/:id`

- **Objetivo**: Eliminar una traducción del historial.

**Ejemplo:**

```http
DELETE /api/translations/5
```

**Respuesta (200):**

```json
{ "deleted": 1 }
```

- `deleted: 1`: Significa que se ha borrado una fila.
- `deleted: 0`: Significa que no existe una traducción con ese id.

---

### DELETE `/api/translations`

- **Objetivo**: Limpia todo el historial de traducciones.

**Ejemplo:**

```http
DELETE /api/translations
```

**Respuesta (200):**

```json
{ "deleted": 47 }
```

---

### GET `/api/languages`

- **Objetivo**: Obtener la lista de idiomas que se pueden utilizar.

**Respuesta (200):**

```json
[
  { "code": "es", "name": "Español" },
  { "code": "en", "name": "Inglés" },
  { "code": "fr", "name": "Francés" }
]
```

## 🚀 Extensiones futuras

- Soporte para más idiomas.
- Caché de traducciones frecuentes.
- Detección automática de idioma.
- Exportar historial a CSV/PDF.
- Autenticación de usuarios.

---

## 🌿 Git y workflow

- **Rama**:
  - `hito2/desarrollo-ia`

---