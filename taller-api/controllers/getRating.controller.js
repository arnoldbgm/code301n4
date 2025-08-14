/*
   Crearemos el controlador de rating que devuelva todas las peliculas con un rating mayor a 8
*/
import fs from "fs";

export function getRating(req, res) {
   try {
      const data = fs.readFileSync("./data/movies.json", "utf8");
      const peliculas = JSON.parse(data);

      const peliculasTop = peliculas.filter((peli) => peli.imdb_rating >= 9.3);
      res.json(peliculasTop);
   } catch (error) {
      res.status(500).json({
         error: "Internal Server Error",
      })
   }
}