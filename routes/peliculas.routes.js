/*
   Aqui vamos a definir las rutas que va a tenir mi aplicacion
*/
import { Router } from "express"; 
import { traerPeliculas } from "../controllers/traerPeliculas.controller.js";
import { contarPeliculas } from "../controllers/contarPeliculas.controller.js";
// Crear tu instancia del router
export const api = Router();

api.get("/peliculas", traerPeliculas);
api.get("/peliculas/count", contarPeliculas)