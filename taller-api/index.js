/*
   ✅ const express = require('express')
   ✅const app = express()
   ✅const port = 3000

   ENDPOINT
   ✖️app.get('/', (req, res) => {
   ✖️res.send('Hello World!')
   ✖️})

   app.listen(port, () => {
   console.log(`Example app listening on port ${port}`)
   })
*/

import express from "express";
import { api } from "./routes/routesMovies.routes.js";

const app = express();
const port = 3000;

// Vamos a vincular las rutas a nuestro servidor
app.use(api)
app.use(express.json());

// Levantar mi servidor
app.listen(port, () => {
   console.log("El servidor se ha iniciado correctamente 🚀");
   console.log(`http://localhost:${port}`);
})