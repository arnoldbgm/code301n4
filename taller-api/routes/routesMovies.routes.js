// Importar el Router de Express
import { Router } from "express";
import { getAllPeliculas } from "../controllers/getAllMovies.controller.js";
import { getRating } from "../controllers/getRating.controller.js";

// Crear una instancia del Router
export const api = Router();

// Crear los endpoints y ascociar los controladores

// http://localhost:3000/movies
api.get("/movies", getAllPeliculas);
// http://localhost:3000/rating
api.get("/rating", getRating);