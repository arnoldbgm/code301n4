/*
   const express = require('express')
   const app = express()
   const port = 3000
*/


import express from "express";
import fs from "fs";
// Vamos a crear una instancia de nuestro servidor
const app = express();
// Siempre un servidor va a tener un puerto
const port = 3000;


/*
   Siempre va a correr en la siguiente ruta:
   http://localhost:3000
*/
app.listen(port, () => {
   console.log(`💚 Mi servidor esta corriendo en el puerto ${port}`);
})

/*
   Endpoint- Ruta o Link
 */

app.get("/saludo", (req, res) => {
   res.json({
      "saludo": "Hola amigos"
   })
})

/*
   Crear un endpoit de tipo GET, que retorne todo el json de peliculas
   El endpoint debe de llamarse /peliculas
*/

app.get("/peliculas", (req, res) => {
   try {
      const data = fs.readFileSync("./data/movies.json", "utf8");
      const peliculas = JSON.parse(data);
      res.json(peliculas);
   } catch (error) {
      res.status(500).json({ error: "No se pudo leer el archivo de películas" });
   }
});