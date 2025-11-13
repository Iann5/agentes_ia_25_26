// IMPORTACIONES
import dotenv from "dotenv";

// Cargo las variables .env a este fichero
dotenv.config();
// todas las variables están en process.env.NOMBRE_DE_LA_VARIABLE

//Mostrar por consola el valor de las variables de entorno

console.log("URL de acceso: ", process.env.URL);
console.log("Puerto: ", process.env.PORT);
console.log(`URL con puerto: ${process.env.URL}:${Number(process.env.PORT)+1}`);
