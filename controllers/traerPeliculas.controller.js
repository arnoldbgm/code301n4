/*
   En este contralador vamos a definir la logica, para traer
   todas las peliculas

   (req, res) => {
      try {
         const data = fs.readFileSync("./data/movies.json", "utf8");
         const peliculas = JSON.parse(data); // Parser el JSON a un objeto
         res.json(peliculas);
      } catch (error) {
         res.status(500).json({ error: "No se pudo leer el archivo de películas" });
      }
   }
*/
import fs from "fs";

export function traerPeliculas(req, res) {
   try {
      const data = fs.readFileSync("./data/movies.json", "utf8");
      const peliculas = JSON.parse(data); // Parser el JSON a un objeto
      res.json(peliculas);
   } catch (error) {
      res.status(500).json({ error: "No se pudo leer el archivo de películas" });
   }
}