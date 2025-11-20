// backend/routes.js
import { Router } from 'express';
import axios from 'axios';
import db from './db.js';
import { traducir } from './services.js';

const router = Router();

// COMPROBAR si el idioma es válido
const VALID_LANGS = ['es', 'en', 'fr'];

function idiomaValido(code) {
  return VALID_LANGS.includes(code);
}

// 🟢 GET /api/health
router.get('/health', async (req, res) => {
  res.json({ status: 'ok', ollama: process.env.OLLAMA_URL });
});

// 🟢 POST /api/translate
router.post("/translate", async (req, res) => {
  try {
    const { text, sourceLang, targetLang } = req.body;

    // Llamada a la función del service
    const resultado = await traducir(text, sourceLang, targetLang);

    // Devuelve JSON al frontend o a Thunder Client
    res.json(resultado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// 🟢 GET /api/translations
router.get('/translations', (req, res) => {
  const { sourceLang, targetLang } = req.query;

  let sql = 'SELECT * FROM traducciones WHERE 1=1';
  const params = [];

  if (sourceLang) {
    sql += ' AND idioma_origen = ?';
    params.push(sourceLang);
  }
  if (targetLang) {
    sql += ' AND idioma_destino = ?';
    params.push(targetLang);
  }

  sql += ' ORDER BY created_at DESC';

  const rows = db.prepare(sql).all(...params);
  res.json(rows);
});

// 🟢 GET /api/translations/:id
router.get('/translations/:id', (req, res) => {
  const id = Number(req.params.id);
  const row = db.prepare('SELECT * FROM traducciones WHERE id = ?').get(id);

  if (!row) return res.status(404).json({ error: 'No encontrado' });

  res.json(row);
});

// 🟢 DELETE /api/translations/:id
router.delete('/translations/:id', (req, res) => {
  const id = Number(req.params.id);
  const stmt = db.prepare('DELETE FROM traducciones WHERE id = ?');
  const result = stmt.run(id);

  res.json({ deleted: result.changes });
});

// 🟢 DELETE /api/translations
router.delete('/translations', (req, res) => {
  const stmt = db.prepare('DELETE FROM traducciones');
  const result = stmt.run();

  res.json({ deleted: result.changes });
});

// 🟢 GET /api/languages
router.get('/languages', (req, res) => {
  res.json([
    { code: 'es', name: 'Español' },
    { code: 'en', name: 'Inglés' },
    { code: 'fr', name: 'Francés' },
  ]);
});

export default router;
