# ✅ Checklist de progreso — Hito 2: Traductor Inteligente (Ian y Sergio)

> Repositorio: `traductor-ia-IanAT-SergioRM`  
> Profesor: Isaías FL  
> Asignatura: Desarrollo Web en Entorno Cliente (2º DAW)

## 🏗️ Parte 1: Configuración inicial

- [ ] Crear carpeta `traductor-ia-IanAT-SergioRM` (Ian)
- [ ] Inicializar repositorio Git (`git init`) (Ian)
- [ ] Crear rama `hito2/desarrollo-ia` (Ian)
- [ ] Crear `.gitignore`, `.env` y `.env.example` (Sergio)
- [ ] Verificar instalación de Node.js, Docker y Ollama

---

## 💾 Parte 2: Backend (Ian)

- [ ] Crear archivo `backend/db.js` y configurar SQLite3 con `better-sqlite3`
- [ ] Crear `backend/server.js` con Express, CORS y dotenv
- [ ] Crear `backend/routes.js` con endpoints:
  - [ ] GET `/api/health`
  - [ ] POST `/api/translate`
  - [ ] GET `/api/translations`
  - [ ] GET `/api/translations/:id`
  - [ ] DELETE `/api/translations/:id`
  - [ ] DELETE `/api/translations`
  - [ ] GET `/api/languages`
- [ ] Implementar funciones principales en `backend/services.js`:
  - [ ] `traducir(text, sourceLang, targetLang)`
  - [ ] `obtenerHistorial(filtros)`
  - [ ] `obtenerTraduccionPorId(id)`
  - [ ] `eliminarTraduccion(id)`
  - [ ] `limpiarHistorial()`
  - [ ] `validarIdioma(codigo)`
- [ ] Integrar Ollama (`OLLAMA_URL=http://localhost:11434`)
- [ ] Insertar traducciones en BD y devolver objeto completo
- [ ] Probar endpoints con REST Client o Postman

---

## 🎨 Parte 3: Frontend (Sergio)

- [ ] Crear `frontend/index.html` con estructura semántica:
  - [ ] Área para texto a traducir
  - [ ] Selectores de idioma origen y destino
  - [ ] Botones "Traducir" y "Limpiar"
  - [ ] Resultado y lista de historial
- [ ] Crear `frontend/style.css` con estilos responsivos
- [ ] Crear `frontend/main.js`:
  - [ ] Fetch a `/api/translate`
  - [ ] Mostrar traducción en UI
  - [ ] Consultar `/api/translations` (historial)
  - [ ] Eliminar traducciones del historial
  - [ ] Manejar errores y estados de carga
- [ ] Testear funcionalidad completa del frontend

---

## 🧪 Parte 4: Validación y Tests (Sergio)

- [ ] Crear `validacion.http` con tests:
  - [ ] GET `/api/health`
  - [ ] POST `/api/translate` (válido y erróneo)
  - [ ] GET `/api/translations`
  - [ ] GET `/api/translations/:id`
  - [ ] DELETE `/api/translations/:id`
  - [ ] DELETE `/api/translations`
  - [ ] GET `/api/languages`
- [ ] Verificar respuestas correctas (200, 400, 404)
- [ ] Comprobar comportamiento ante entradas inválidas

---

## 🐳 Parte 5: Dockerización (Ambos)

- [ ] Crear `backend/Dockerfile` (imagen base: node:20-alpine)
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
