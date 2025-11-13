// IMPORTACIONES
import { config } from "dotenv";
import { exec } from "child_process";

// declaración de variables
config(); // <-- ha cargado en process.env las variables

const API_URL = process.env.API_URL;

export const getAllUsers = () => {
    const URL_BASE = `${API_URL}/users`;
    const cmd =`curl -s ${URL_BASE}`
    //console.log(cmd);
    exec(cmd, (error, stdout, stderr) => {
        if (error) {
            console.error("Error ejecutando el curl", error.message);
            return;
        }
        if (stderr) {
            console.error("Error en la salida", stderr);
            return;
        }
        const data = JSON.parse(stdout);
        console.log(data);
        // console.table(data);
    
    });
}