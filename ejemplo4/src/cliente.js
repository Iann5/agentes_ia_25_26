// el fichero cliente lanzará peticiones a la API REST

// const traerPostCervezas = async () => {
//     try {
//     const response = await fetch("http://192.168.70.145:4000/posts");
//     const data = await response.json();
//     console.log(data);
//     } catch {
//         console.error("Error al traer los posts:", error);
//     }
// };
// traerPostCervezas();

// IMPORTS
import { config } from "dotenv";
import express from "express";
import dataAPI from "./db/bd.js"; // Tu base de datos local (array con data)
import cors from "cors";

const PORT = process.env.PORT || 4000;
const SERVER_URL = process.env.SERVER_URL || "http://localhost";
const HOST = process.env.HOST || "0.0.0.0";

// Inicialización de Express
const app = express();
app.use(cors());
app.use(express.json());

// Middleware simple de logs
app.use((req, res, next) => {
  const time = new Date().toISOString();
  console.log(`[${time}] ${req.method} ${req.url}`);
  next();
});

// -------------------------------
// CRUD DE CLIENTES
// -------------------------------

// READ ALL - Obtener todos los clientes
app.get("/clientes", (req, res) => {
  res.json({
    success: true,
    count: dataAPI.length,
    data: dataAPI,
  });
});

// READ ONE - Obtener un cliente por ID
app.get("/clientes/:id", (req, res) => {
  const { id } = req.params;
  const cliente = dataAPI.find(c => c.id === parseInt(id));

  if (!cliente) {
    return res.status(404).json({ success: false, message: "Cliente no encontrado" });
  }

  res.json({ success: true, data: cliente });
});

// CREATE - Crear un nuevo cliente
app.post("/clientes", (req, res) => {
  const { name, auth } = req.body;

  if (!name || !auth) {
    return res.status(400).json({
      success: false,
      message: "Faltan datos: name o auth",
    });
  }

  const nuevoCliente = {
    id: dataAPI.length > 0 ? dataAPI[dataAPI.length - 1].id + 1 : 1,
    name,
    auth,
    creadAt: new Date().toDateString(),
  };

  dataAPI.push(nuevoCliente);

  res.status(201).json({
    success: true,
    message: "Cliente creado correctamente",
    data: nuevoCliente,
  });
});

// UPDATE - Actualizar un cliente existente
app.put("/clientes/:id", (req, res) => {
  const { id } = req.params;
  const { name, auth } = req.body;

  const index = dataAPI.findIndex(c => c.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ success: false, message: "Cliente no encontrado" });
  }

  dataAPI[index] = {
    ...dataAPI[index],
    name: name || dataAPI[index].name,
    auth: auth || dataAPI[index].auth,
  };

  res.json({
    success: true,
    message: "Cliente actualizado correctamente",
    data: dataAPI[index],
  });
});

// DELETE - Eliminar un cliente
app.delete("/clientes/:id", (req, res) => {
  const { id } = req.params;
  const index = dataAPI.findIndex(c => c.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ success: false, message: "Cliente no encontrado" });
  }

  const eliminado = dataAPI.splice(index, 1);

  res.json({
    success: true,
    message: "Cliente eliminado correctamente",
    data: eliminado[0],
  });
});