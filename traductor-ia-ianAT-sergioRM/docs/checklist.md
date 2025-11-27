# ✅ Checklist de progreso — Hito 2: Traductor Inteligente (Ian y Sergio)

> Repositorio: `traductor-ia-IanAT-SergioRM`  
> Profesor: Isaías FL  
> Asignatura: Desarrollo Web en Entorno Cliente (2º DAW)

## 🏗️ Parte 1: Configuración inicial

- [x] Crear carpeta `traductor-ia-IanAT-SergioRM` (Ian)
- [x] Inicializar repositorio Git (`git init`) (Ian)
- [x] Crear rama `hito2/desarrollo-ia` (Ian)
- [x] Crear `.gitignore`, `.env` y `.env.example` (Sergio)
- [ ] Verificar instalación de Node.js, Docker y Ollama

---

## 💾 Parte 2: Backend

- [x] Crear archivo `backend/db.js` y configurar SQLite3 con `better-sqlite3` (Ian)
- [x] Crear `backend/server.js` con Express, CORS y dotenv (Ian)
- [x] Crear `backend/routes.js` con endpoints: (Ian)
  - [x] GET `/api/health` (Ian)
  - [x] POST `/api/translate` (Ian)
  - [x] GET `/api/translations` (Ian)
  - [x] GET `/api/translations/:id` (Ian)
  - [x] DELETE `/api/translations/:id` (Ian)
  - [x] DELETE `/api/translations` (Ian)
  - [x] GET `/api/languages` (Ian)
- [x] Implementar funciones principales en `backend/services.js`: (Sergio)
  - [x] `traducir(text, sourceLang, targetLang)`(Sergio)
  - [x] `obtenerHistorial(filtros)`(Sergio)
  - [x] `obtenerTraduccionPorId(id)`(Sergio)
  - [x] `eliminarTraduccion(id)`(Sergio)
  - [x] `limpiarHistorial()`(Sergio)
  - [x] `validarIdioma(codigo)`(Sergio)
- [x] Integrar Ollama (`OLLAMA_URL=http://localhost:11434`) (Sergio)
- [x] Insertar traducciones en BD y devolver objeto completo (Ian)
- [x] Probar endpoints con REST Client o Postman (Ian)

---

## 🎨 Parte 3: Frontend 

- [x] Crear `frontend/index.html` con estructura semántica: (Sergio)
  - [x] Área para texto a traducir
  - [x] Selectores de idioma origen y destino
  - [x] Botones "Traducir" y "Limpiar"
  - [x] Resultado y lista de historial
- [x] Crear `frontend/style.css` con estilos responsivos (Sergio)
- [x] Crear `frontend/main.js`: (Sergio)
  - [x] Fetch a `/api/translate`
  - [x] Mostrar traducción en UI
  - [x] Consultar `/api/translations` (historial)
  - [x] Eliminar traducciones del historial
  - [x] Manejar errores y estados de carga
- [x] Testear funcionalidad completa del frontend (Ian)

---

## 🧪 Parte 4: Validación y Tests

- [x] Crear `validacion.http` con tests:  (Sergio)
  - [x] GET `/api/health`
  - [x] POST `/api/translate` (válido y erróneo)
  - [x] GET `/api/translations`
  - [x] GET `/api/translations/:id`
  - [x] DELETE `/api/translations/:id`
  - [x] DELETE `/api/translations`
  - [x] GET `/api/languages`
- [x] Verificar respuestas correctas (200, 400, 404)  (Sergio)
- [x] Comprobar comportamiento ante entradas inválidas (Ian)

---

## 🐳 Parte 5: Dockerización (Ambos)

- [x] Crear `backend/Dockerfile` (imagen base: node:20-alpine)
- [ ] Crear `docker-compose.yml` con servicios:
  - [ ] Backend (puerto 3000)
  - [ ] Ollama (puerto 11434)
  - [ ] Frontend (puerto 5173 o servido desde backend)
- [ ] Configurar redes compartidas y variables `.env`
- [ ] Ejecutar `docker compose up --build` y verificar funcionamiento

---

## 📖 Parte 6: Documentación (Ambos)

- [ ] Completar `README.md` con:
  - [ ] Descripción del proyecto
  - [ ] Autores y división de trabajo
  - [ ] Requisitos e instalación
  - [ ] Ejecución local y con Docker
  - [ ] Endpoints documentados con ejemplos
  - [ ] Estructura de carpetas y decisiones de diseño
  - [ ] Posibles mejoras futuras
- [ ] Incluir capturas o ejemplos si procede
- [ ] Añadir sección de créditos con “Co-authored-by”

---

## 🌿 Parte 7: Git y Control de versiones (Ian)

- [ ] Hacer commits incrementales y descriptivos
- [ ] Mensajes de commit siguiendo convención (`feat:`, `fix:`, `docs:`)
- [ ] Crear Pull Request hacia `main`
- [ ] Incluir descripción, división de trabajo y cómo probarlo
- [ ] Ambos figuran como coautores (`Co-authored-by`)
