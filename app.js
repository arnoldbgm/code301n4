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

app.use(express.json());

/*
   Siempre va a correr en la siguiente ruta:
   http://localhost:3000
*/
app.listen(port, () => {
   console.log(`💚 Mi servidor esta corriendo en el puerto`);
   console.log(`🚀 Puedes acceder a él en http://localhost:${port}`);
})

/*
   Endpoint- Ruta o Link
   Metodos - HTTP
   GET - Obtener informacion
   POST - Enviar informacion o crear informacion
   PUT - Actualizar informacion
   PATCH - Actualizar informacion parcial
   DELETE - Eliminar informacion
*/


// http://localhost:3000/saludo
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
      const peliculas = JSON.parse(data); // Parser el JSON a un objeto
      res.json(peliculas);
   } catch (error) {
      res.status(500).json({ error: "No se pudo leer el archivo de películas" });
   }
});

/*
   Crear un endpoint de tipo GET, que retorne el numero de peliculas 
   disponible que tengo en el archivo
   El endpoint debe de llamarse /peliculas/count
   http://localhost:3000/peliculas/count
*/

app.get("/peliculas/count", (req, res) => {
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
})

/*
   RETO 01 - 02
   Crear un endpoint de tipo GET, que retorne las peliculas con un imdb_rating mayor a 9
   El endpoint debe de llamarse /peliculas/rating-top

   Crear un endpoint de tipo GET, que retorne las peliculas con un imdb_rating menor a 5
   El endpoint debe de llamarse /peliculas/rating-low 

   🍏 TIP:
   Deben de usar el metodo filter de los arrays para poder traer las peliculas con rating
   mayor o menor segun corresponda
*/

app.get("/peliculas/rating-top", (req, res) => {
   try {
      const data = fs.readFileSync("./data/movies.json", "utf8");
      const peliculas = JSON.parse(data); // Parser el JSON a un objeto

      const peliculasTop = peliculas.filter((peli) => peli.imdb_rating >= 9)
      res.json(peliculasTop)

   } catch (error) {
      res.status(500).json({
         error: "Hubo un error inesperado en el servidor"
      })
   }
})

app.get("/peliculas/rating-low", (req, res) => {
   try {
      const data = fs.readFileSync("./data/movies.json", "utf8");
      const peliculas = JSON.parse(data); // Parser el JSON a un objeto

      const peliculasMalas = peliculas.filter((peli) => peli.imdb_rating <= 5)
      res.json(peliculasMalas)

   } catch (error) {
      res.status(500).json({
         error: "Hubo un error inesperado en el servidor"
      })
   }
})

/*
   Para lograr crear un endpoint que retorne una pelicula con un id especifico
   debemos de usar en el endpoint un parametro dinamico
   Ejemplo: /peliculas/:id

   Para captura el parametro dinamico, debemos de usar req.params
   Ejemplo: const id = req.params.id
*/

app.get("/peliculas/:id", (req, res) => {
   try {
      const id = req.params.id; // Valor capturado del parametro dinamico
      const data = fs.readFileSync("./data/movies.json", "utf8");
      const peliculas = JSON.parse(data); // Parser el JSON a un objeto

      const peliculaUnica = peliculas.find((peli) => peli.id === id);

      if (!peliculaUnica) {
         return res.json({
            msg: "No se encontro la pelicula"
         })
      }

      res.json(peliculaUnica);
   } catch (error) {
      res.status(500).json({
         error: "Hubo un error inesperado en el servidor"
      })
   }
})

/* 
   RETO 03
   Crear un endpoint de tipo GET, que retorne las peliculas
   que cumplan con ser del año indicado por el parametro dinamico

   El endpoint debe de llamarse /peliculas/year/:year
   Ejemplo: /peliculas/year/2020

   Mostrar un mensaje si no se encuentra ninguna pelicula en
   el año indicado
   🍏    TIP:
   Usar el metodo filter
*/

/*
   POST
   Cuando creamos un endpoint de tipo POST, se espera que el cliente
   nos envie informacion
   El cliente nos envia la informacion en un body con formato JSON

   Para poder leer la informacion de un body de tipo JSON
   debemos de agregar un middleware (una tuberia que procesa informacion)

   app.use(express.json());

   Ya podemos comenzar a crear nuestro endpoint de tipo POST

   req.body
   Accedemos a la informacion que nos envia el cliente
*/

app.post("/crear-pelicula", (req, res) => {
   try {
      const infoRecibida = req.body;

      const data = fs.readFileSync("./data/movies.json", "utf8");
      const peliculas = JSON.parse(data); // Parser el JSON a un objeto

      // Vamos a modificar el archivo de peliclas
      fs.writeFileSync("./data/movies.json", JSON.stringify([...peliculas, infoRecibida]))

      res.json({
         msg: "Pelicula creada correctamente"
      })

   } catch (error) {
      res.status(500).json({
         error: "Hubo un error inesperado en el servidor"
      })
   }
})

/*
   PUT
   Cuando vamos a actualizar informacion, debemos de usar el metodo PUT

   El cliente nos debe enviar la informacion que se va actualizar
   El cliente nos debe de enviar el id de la pelicula que se va actualizar
*/

app.put("/actualizar-pelicula/:id", (req, res) => {
   try {
      // 1. Capturamos el valor del parametro dinamico
      const id = req.params.id;
      // 2. Capturamos la informacion que el cliente nos envia 
      const dataRecibida = req.body;
      const data = fs.readFileSync("./data/movies.json", "utf8");
      const peliculas = JSON.parse(data); // Parser el JSON a un objeto

      // 3. Buscar la pelicula que se va actualizar
      const peliculaEncontrada = peliculas.find((peli) => peli.id === id);

      // 4. Vamos a actualizar los valores de la pelicula

      peliculaEncontrada.title = dataRecibida.title

      // 5. Vamos a cambiar el archivo de peliculas

      

   } catch (error) {
      res.status(500).json({
         error: "Hubo un error inesperado en el servidor"
      })
   }
})