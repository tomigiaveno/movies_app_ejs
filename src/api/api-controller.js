const db = require("../../database/models");
  
  const getMovies = async (req, res) => {
    const movies = await db.Movie.findAll();
    res.status(200).json({ data: movies });
  };
  
  const getMovieById = async (req, res) => {
    const { movieId } = req.params;
    const movie =  await db.Movie.findByPk(movieId);
    res.status(200).json({ data: movie });
  };
  
  const postMovie = async (req, res) => {
    const { title, rating, awards, releaseDate, length, genreId } = req.body;
    const newMovie = await db.Movie.create({title, rating, awards, release_date: releaseDate, length, genre_id: genreId });
    
    res.status(201).json({ data: newMovie });
  };
  
  const putMovie = async (req, res) => {
    const { movieId } = req.params;
    const { title, rating, awards, releaseDate, length, genreId } = req.body;

    const movie = await db.Movie.findByPk(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found."});
    }

    movie.title = title;
    movie.rating = rating; 
    movie.awards = awards; 
    movie.release_date = releaseDate;
    movie.length = length; 
    movie.genre_id = genreId;
    await movie.save();
    
    
    res.status(200).json({ data: movie });
  };
  
  const deleteMovie = async (req, res) => {
    const { movieId } = req.params;
      await db.Movie.destroy({ where: { id: movieId } });

    res.status(204).json({ message: "pelicula borrada satisfactoriamente"});
  };
  
  module.exports = {
    getMovies,
    getMovieById,
    postMovie,
    putMovie,
    deleteMovie,
  };