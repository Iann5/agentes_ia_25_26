import db from "./db.js";

const OLLAMA_URL = process.env.OLLAMA_URL || "http://localhost:11434";
const MODELO = process.env.OLLAMA_MODEL || "mistral";

// Idiomas válidos
const IDIOMAS_VALIDOS = ["es", "en", "fr"];

// Funcion para validar idiomas
/**
 * @author Sergio e Ian
 * @description Valida si el código de idioma es válido.
 * @param {string} codigo - Código de idioma a validar.
 * @returns {boolean} - true si es válido, false si no.
 */
export function validarIdioma(codigo) {
  return IDIOMAS_VALIDOS.includes(codigo);
}

/**
 * @author Sergio e Ian
 * @description Traduce un texto de un idioma a otro usando Ollama y guarda la traducción en la base de datos.
 * @param {string} text - Texto a traducir.
 * @param {string} sourceLang - Código del idioma origen.
 * @param {string} targetLang - Código del idioma destino.
 * @returns {object} - Objeto con los detalles de la traducción.
 */
export async function traducir(text, sourceLang, targetLang) {
  // 1. VALIDACIONES
  if (!text || text.trim() === "") {
    throw new Error("El texto no puede estar vacío.");
  }

  if (!validarIdioma(sourceLang) || !validarIdioma(targetLang)) {
    throw new Error("Idiomas inválidos. Solo se permiten es, en, fr.");
  }

  if (sourceLang === targetLang) {
    throw new Error("El idioma origen y destino deben ser distintos.");
  }

  if (text.length > 5000) {
    throw new Error("El texto no puede superar los 5000 caracteres.");
  }

  // 2. MAPEO DE CÓDIGOS A NOMBRES PARA EL PROMPT
  const idiomaMap = {
    es: "español",
    en: "inglés",
    fr: "francés",
  };

  const sourceNombre = idiomaMap[sourceLang];
  const targetNombre = idiomaMap[targetLang];

  // 3. CONSTRUIR PROMPT
  const prompt = `
Eres un traductor profesional. Traduce el siguiente texto del idioma ${sourceNombre}
al idioma ${targetNombre}. Responde ÚNICAMENTE con el texto traducido, sin comentarios extra.

Texto a traducir:
${text}
  `;

  // 4. MEDIR TIEMPO
  const inicio = Date.now();

  // 5. LLAMAR A OLLAMA
  const respuesta = await fetch(`${OLLAMA_URL}/api/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: MODELO,
      prompt: prompt,
      stream: false,
    }),
  });

  if (!respuesta.ok) {
    throw new Error("Error al conectar con Ollama.");
  }

  const datos = await respuesta.json();
  const duracion = Date.now() - inicio;

  const traduccion = datos.response?.trim() || "";

  // 6. GUARDAR EN BD (usar los códigos originales)
  const stmt = db.prepare(`
    INSERT INTO traducciones (texto_original, idioma_origen, idioma_destino, texto_traducido, modelo, duracion_ms)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    text,
    sourceLang,
    targetLang,
    traduccion,
    MODELO,
    duracion
  );

  // 7. DEVOLVER RESULTADO
  return {
    id: result.lastInsertRowid,
    texto_original: text,
    idioma_origen: sourceLang,
    idioma_destino: targetLang,
    texto_traducido: traduccion,
    modelo: MODELO,
    duracion_ms: duracion,
  };
}


/**
 * Recupera traducciones guardadas en la BD.
 * @author Sergio e Ian
 * @description Obtiene traducciones de la base de datos con filtros opcionales.
 * @param {Object} filtros - { sourceLang, targetLang, limit }
 * @returns {Array} Array de traducciones
 */
export function obtenerTraducciones(filtros = {}) {
  let query = "SELECT * FROM traducciones";
  const condiciones = [];
  const params = [];

  // FILTROS
  if (filtros.sourceLang) {
    condiciones.push("idioma_origen = ?");
    params.push(filtros.sourceLang);
  }

  if (filtros.targetLang) {
    condiciones.push("idioma_destino = ?");
    params.push(filtros.targetLang);
  }

  if (condiciones.length > 0) {
    query += " WHERE " + condiciones.join(" AND ");
  }

  query += " ORDER BY fecha DESC";

  const limite = Math.min(filtros.limit || 50, 50);
  query += " LIMIT ?";
  params.push(limite);

  const stmt = db.prepare(query);
  const resultados = stmt.all(...params);

  return resultados;
}

/**
 * @author Sergio e Ian
 * @description Obtiene una traducción específica por su ID.
 * @param {number} id - ID de la traducción
 * @returns {Object} Objeto de traducción
 */
export function obtenerTraduccionPorId(id) {
  if (!id || typeof id !== "number") {
    throw new Error("ID inválido.");
  }

  const stmt = db.prepare("SELECT * FROM traducciones WHERE id = ?");
  const resultado = stmt.get(id);

  if (!resultado) {
    throw new Error("Traducción no encontrada.");
  }

  return resultado;
}

/**
 * Elimina una traducción específica del historial por su ID.
 *
 * @param {number} id - ID de la traducción a eliminar
 * @returns {Object} Confirmación de eliminación { success: true, mensaje: "..." }
 */
export function eliminarTraduccion(id) {
  const traduccion = obtenerTraduccionPorId(id);

  const stmt = db.prepare("DELETE FROM traducciones WHERE id = ?");
  const info = stmt.run(id);

  return {
    success: info.changes > 0,
    mensaje:
      info.changes > 0 ? `${id} Eliminada.` : `${id} No se pudo eliminar.`,
  };
}

/**
 * @author Sergio e Ian
 * @description Limpia todo el historial de traducciones.
 * @returns {Object} Confirmación con cantidad de registros eliminados
 */
export function limpiarHistorial() {
  const stmt = db.prepare("DELETE FROM traducciones");
  const info = stmt.run();

  return {
    success: true,
    eliminadas: info.changes,
  };
}
