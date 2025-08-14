/*
 Un controlador siempre va a ser una funcion 
 Siempre tendra como parametros el req y el res
 req => Request (Solicita el cliente)
 res => Response (Responder el servidor)
*/

import fs from "fs";

export function getAllPeliculas(req, res) {
   try {
      const data = fs.readFileSync("./data/movies.json", "utf8");
      const peliculas = JSON.parse(data); // Parser el JSON a un objeto
      res.json(peliculas);
   } catch (error) {
      res.status(500).json({ error: "No se pudo leer el archivo de películas" });
   }
}