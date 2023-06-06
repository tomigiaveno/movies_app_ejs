const { Router } = require("express");

const moviesController = require("./api-controller");

const apiRouter = Router();



apiRouter.get("/", moviesController.getMovies); 

// GET /api/movies/:movieId
apiRouter.get('/:movieId', moviesController.getMovieById);
  
  // POST /api/movies
  apiRouter.post('/', moviesController.postMovie);
  
  // PUT /api/movies/:movieId
  apiRouter.put('/:movieId', moviesController.putMovie);
  
  // DELETE /api/movies/:movieId
  apiRouter.delete('/:movieId', moviesController.deleteMovie);

  module.exports = apiRouter;
  