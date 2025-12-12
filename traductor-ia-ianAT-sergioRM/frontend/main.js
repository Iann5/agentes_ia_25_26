// main.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-traduccion");
  const textoOrigen = document.getElementById("texto-origen");
  const idiomaOrigen = document.getElementById("idioma-origen");
  const idiomaDestino = document.getElementById("idioma-destino");
  const textoTraducido = document.getElementById("texto-traducido");
  const indicadorCarga = document.getElementById("indicador-carga");
  const listaHistorial = document.getElementById("lista-historial");
  const btnBorrarHistorial = document.getElementById("btn-borrar-historial");
  const mensajeError = document.getElementById("mensaje-error");
  const filtroOrigen = document.getElementById("filtro-origen");
  const filtroDestino = document.getElementById("filtro-destino");
  const btnFiltrar = document.getElementById("btn-filtrar");

  async function cargarHistorial(sourceLang = "", targetLang = "") {
    try {
      let url = "http://localhost:3000/api/translations";

      const params = [];
      if (sourceLang) params.push(`sourceLang=${sourceLang}`);
      if (targetLang) params.push(`targetLang=${targetLang}`);

      if (params.length > 0) {
        url += "?" + params.join("&");
      }

      const res = await fetch(url);
      const data = await res.json();

      listaHistorial.innerHTML = "";
      data.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = `${item.idioma_origen} → ${item.idioma_destino}: ${item.texto_original}--${item.texto_traducido}`;
        listaHistorial.appendChild(li);
      });
    } catch (err) {
      console.error(err);
      mensajeError.textContent = "No se pudo cargar el historial";
      mensajeError.parentElement.hidden = false;
    }
  }

  // Función para traducir
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    textoTraducido.textContent = "";
    indicadorCarga.hidden = false;
    mensajeError.parentElement.hidden = true;

    const info = {
      text: textoOrigen.value,
      sourceLang: idiomaOrigen.value,
      targetLang: idiomaDestino.value,
    };

    try {   
      const res = await fetch("http://localhost:3000/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(info),
      });

      if (!res.ok) throw new Error("Error en la traducción");

      const data = await res.json();
      textoTraducido.textContent = data.texto_traducido;
      await cargarHistorial();
    } catch (err) {
      console.error(err);
      mensajeError.textContent = "Error al traducir el texto";
      mensajeError.parentElement.hidden = false;
    } finally {
      indicadorCarga.hidden = true;
    }
  });

  // Limpiar historial
  btnBorrarHistorial.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:3000/api/translations", {
        method: "DELETE",
      });
      listaHistorial.innerHTML = "";
      await cargarHistorial();
    } catch (err) {
      console.error(err);
      mensajeError.textContent = "No se pudo borrar el historial";
      mensajeError.parentElement.hidden = false;
    }
  });

  // Filtrar historial
  btnFiltrar.addEventListener("click", () => {
    const origen = filtroOrigen.value;
    const destino = filtroDestino.value;
    cargarHistorial(origen, destino);
  });

  // Cargar historial al inicio
  cargarHistorial();
});
