// backend/db.js
import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Necesario para __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta donde se guardará la BD
const dbPath = path.join(__dirname, 'db', 'traducciones.db');

// Crear carpeta /db si no existe
const dir = path.join(__dirname, 'db');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Abrir / crear base de datos
const db = new Database(dbPath);

// Crear tabla si no existe
db.exec(`
  CREATE TABLE IF NOT EXISTS traducciones (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    texto_original TEXT NOT NULL,
    texto_traducido TEXT NOT NULL,
    idioma_origen TEXT NOT NULL,
    idioma_destino TEXT NOT NULL,
    modelo TEXT,
    duracion_ms INTEGER,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );
`);

export default db;
