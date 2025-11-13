import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { config } from "dotenv";

// 0- Cargar las variables de entorno cargadas en memoria
config();

// 1- Crear un servidor express
const app = express();

// 2- Crear variables basandonos en las variables de entorno cargados con config()
const PORT=process.env.PORT || 3002
const HOST=process.env.HOST || "0.0.0.0"
const NODE_ENV=process.env.NODE_ENV || "development"
const SERVER_URL=process.env.SERVER_URL || "http://localhost:3002"
const AI_API_URL=process.env.AI_API_URL || "http://localhost:11434"
const AI_MODEL=process.env.AI_MODEL || "llama3.2:1b"

// 3- Midleware a mi aplicaición
// a) habilitar los cors en los navegadores
app.use(cors());

// b) habilitar JSON para preguntas y respuestas
app.use(express.json());

// 4- (Opcional) Crear una función que muestre la info al usuario

// el parentesis antes de la llave es cómo un return
const getInfoApi = () => ({
    service: "Servicio api-ollama",
    status: "ready",
    endpoints: {
        "GET /api": "Mostrar información de la API-OLLAMA",
        "GET /api/modelos": "Mostramos información de los modelos disponibles",
        "POST /api/consultar": "Envia un prompt para realizar consultas a la IA",
    },
    model: AI_MODEL,
    host: `${HOST}:${PORT}`,
    ollama_url: AI_API_URL,
});

// 5 ----- GENERAR LOS ENDPOINTS -----

// ---> /
app.get("/",(req,res)=>{
    res.json(getInfoApi());
});

// ---> /api
app.get("/api", (req, res) => {
    res.json(getInfoApi());
});

// ---> /modelos
app.get("/api/modelos",async (req, res) => {
    try {
        const response = await fetch(`${AI_API_URL}/api/tags`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                signal: AbortSignal.timeout(5000),
            });
        if(!response.ok){
            throw new Error("Error al realizar la petición");
        }    
        const data = await response.json();
        const models = data.models.map((model) => ({ modelo : model.name })) || [];
        res.json(models);

    } catch (error) {
        res.status(502).json({
            error: "Fallo en el acceso al servidor con los modelos",
            message: error.message
        });
    }
}); 

// ---> /api/consulta
app.post("/api/consulta", async (req, res) => {
    const { prompt, model } = req.body || {};
    // el prompt es de tipo string?
    if(!prompt || typeof prompt !== "string"){
        res.status(400).json({
            error: "Error al escribir el prompt",
            message: error.message
        });
    }
    const modelSelect = model || AI_MODEL;
    try{
        const response = await fetch(`${AI_API_URL}/api/generate`,{
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify( {
                model: modelSelect,
                prompt,
                stream: "false",
            }),
            signal: AbortSignal.timeout(30000),
        });
        if(!response.ok){
            throw new Error("Error al realizar la petición");
        }
        const data = await response.json();
        res.json({
            prompt,
            model: modelSelect,
            response: data.response
        });
    }catch(error){
        res.status(502).json({
            error: "Fallo en el acceso al servidor con los modelos",
            message: error.message
        });
    }
});

// 6 Levantar el servidor express para escuchar peticiones a mis endpoints
app.listen(PORT, HOST, () => {
    console.log("------------- Servidor express funcionando -------------");
    console.log(`\t Servidor escuchando en http://${HOST} en el puerto ${PORT}`);
    console.log(`\t Escuchando peticiones ...`);
});