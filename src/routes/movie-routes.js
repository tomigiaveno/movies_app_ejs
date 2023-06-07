const { Router } = require("express");
const movieController = require("../controllers/movie-controller");

const movieRouter = Router();

// GET /movies/details/:movieId
movieRouter.get("/details/:movieId", movieController.getMovieDetails);

// GET /movies/create
movieRouter.get("/create", movieController.createMovieGet);

// POST /movies/create
movieRouter.post("/create", movieController.createMoviePost);

// GET /movies/edit/:movieId
movieRouter.get("/edit/:movieId", movieController.editMovieGet);

// PUT /movies/edit/:movieId
movieRouter.put("/edit/:movieId", movieController.editMoviePut);

// DELETE /movies/delete/:movieId
movieRouter.delete("/delete/:movieId", movieController.deleteMovie);

module.exports = movieRouter;
