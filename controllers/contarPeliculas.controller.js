import fs from "fs";

export function contarPeliculas(req, res){
   try {
      const data = fs.readFileSync("./data/movies.json", "utf8");
      const peliculas = JSON.parse(data); // Parser el JSON a un objeto
      const nroPeliculas = peliculas.length;
      res.json({
         cantidadPeliculas: nroPeliculas
      });
   } catch (error) {
      res.status(500).json({
         error: "Hubo un error inesperado en el servidor"
      })
   }
}