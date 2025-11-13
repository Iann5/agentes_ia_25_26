// fichero encargado de levantar una API REST con Express
// IMPORT
import { config } from "dotenv";
import express from "express";
import dataAPI from "./db/db.js";
import cors from "cors";

// variables de entorno
config();

const PORT= process.env.PORT || 4000;
const NODE_ENV= process.env.NODE_ENV;
const SERVER_URL= process.env.SERVER_URL || "http://localhost";
const HOST= process.env.HOST;


const app = express();

// CORS voy a permitir CORS
app.use(cors())

// voy a permitir JSON como cuerpo de petición
app.use(express.json());

// midleware

app.use((req,res,next) => {
    const timeData = new Date().toISOString();
    console.log(`${timeData} ${req.method} ${req.url} - IP ${req.ip}`);
    next();
})

// Bienvenido...
app.get('/', (req,res) => {
    res.json({
        message:"Mini API de post de alumnos",
        version:"1.0.0",
        endpoints: {
            "GET /posts" : "Obtiene todos los posts de mi API",
            "POST /usuarios" : "Crea un nuevo post",
            "PUT /posts/:id" : "Actualiza un post existente",
            "DELETE /posts/:id" : "Elimina un usuario por ID"
        }
    });
});


// READ ALL - Obtener todos los posts
app.get('/posts', (req,res) => {
    console.log("Petición GET para traer los post de mi API");
    res.json({
        succes:true,
        data:dataAPI,
        // para que se autoincrementen : count:posts.length
        count:dataAPI.length,

    });
});

// READ ONE - Obtener un post por id
app.get('/posts/:id', (req, res) => {
    const { id } = req.params;
    const post = dataAPI.find(p => p.id === parseInt(id));

    if (!post) {
        return res.status(404).json({ success: false, message: "Post no encontrado" });
    }
    res.json({ success: true, data: post });
});


// CREATE - Crear un nuevo post
app.post('/posts', (req, res) => {
    const { titulo, contenido } = req.body;
    if (!titulo || !contenido) {
        return res.status(400).json({ success: false, message: "Faltan datos: título o contenido" });
    }

    const nuevoPost = { id: idCounter++, titulo, contenido };
    dataAPI.push(nuevoPost);

    res.status(201).json({ success: true, data: nuevoPost });
});

// UPDATE - Actualizar un post existente
app.put('/posts/:id', (req, res) => {
    const { id } = req.params;
    const { titulo, contenido } = req.body;

    const postIndex = dataAPI.findIndex(p => p.id === parseInt(id));
    if (postIndex === -1) {
        return res.status(404).json({ success: false, message: "Post no encontrado" });
    }

    dataAPI[postIndex] = {
        ...dataAPI[postIndex],
        titulo: titulo || dataAPI[postIndex].titulo,
        contenido: contenido || dataAPI[postIndex].contenido
    };

    res.json({ success: true, data: dataAPI[postIndex] });
});

// DELETE - Eliminar un post
app.delete('/posts/:id', (req, res) => {
    const { id } = req.params;
    const postIndex = dataAPI.findIndex(p => p.id === parseInt(id));

    if (postIndex === -1) {
        return res.status(404).json({ success: false, message: "Post no encontrado" });
    }

    const eliminado = dataAPI.splice(postIndex, 1);
    res.json({ success: true, message: "Post eliminado", data: eliminado[0] });
});


// ----- INICIAR EL SERVIDOR -----
app.listen(PORT, HOST, () =>{
    console.log(`Servidor ---> ${SERVER_URL}:${PORT}`);

});