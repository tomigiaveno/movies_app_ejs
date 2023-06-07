const db = require("../../database/models");

const getMovieDetails = async (req, res) => {
  try {
    const { movieId } = req.params;

    const movieAndActors = await getMovieAndActors(movieId);

    if (!movieAndActors) {
      return res
        .status(404)
        .render("movieDetail", { error: "Movie not found" });
    }

    res
      .status(200)
      .render("movieDetail", { movie: movieAndActors, error: null });
  } catch (error) {
    console.error(error);
    res.status(500).render("movieDetail", { error });
  }
};

const createMovieGet = async (req, res) => {
  // Get all genres and select only id and name, raw
  const genres = await getGenres();

  res.status(200).render("movieCreate-edit", {
    pageTitle: "Create",
    movie: null,
    genres,
    error: null,
  });
};

const createMoviePost = async (req, res) => {
  try {
    const { title, rating, awards, releaseDate, length, genreId } = req.body;

    // Create the movie and return the genre name
    const newMovie = await db.Movie.create({
      title,
      rating,
      awards: awards || 0,
      release_date: releaseDate,
      length: length || null,
      genre_id: genreId,
    });

    const movieAndActors = await getMovieAndActors(newMovie.id);

    res
      .status(201)
      .render("movieDetail", { movie: movieAndActors, error: null });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const editMovieGet = async (req, res) => {
  try {
    const { movieId } = req.params;
    const movie = await db.Movie.findByPk(movieId);
    const genres = await getGenres();

    if (!movie) {
      return res.status(404).render("movieCreate-edit", {
        pageTitle: "Edit",
        error: "Movie not found",
      });
    }

    const { release_date, genre_id, ...restMovie } = movie.dataValues;
    const mappedMovie = {
      ...restMovie,
      releaseDate: release_date.toISOString().split("T")[0],
      genreId: genre_id,
    };

    res.status(200).render("movieCreate-edit", {
      pageTitle: "Edit",
      movie: mappedMovie,
      genres,
      error: null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).render("movieCreate-edit", { pageTitle: "Edit", error });
  }
};

const editMoviePut = async (req, res) => {
  try {
    const { movieId } = req.params;
    const { title, rating, awards, releaseDate, length, genreId } = req.body;

    const movie = await db.Movie.findByPk(movieId);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    await movie.update({
      title,
      rating,
      awards: awards || 0,
      release_date: releaseDate,
      length: length || null,
      genre_id: genreId,
    });

    const movieAndActors = await getMovieAndActors(movieId);

    res
      .status(201)
      .render("movieDetail", { movie: movieAndActors, error: null });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const { movieId } = req.params;

    const movie = await db.Movie.findByPk(movieId);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    await movie.destroy();

    res.status(200).json({ message: "Movie deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

async function getMovieAndActors(movieId) {
  try {
    const movieAndActors = await db.Movie.findByPk(movieId, {
      include: [
        { model: db.Genre, as: "genre", attributes: ["name"] },
        {
          model: db.Actor,
          as: "actors",
          attributes: ["first_name", "last_name"],
          through: { attributes: [] },
        },
      ],
    });

    const { release_date, genre, actors, ...restMovieAndActors } =
      movieAndActors?.dataValues;

    return {
      ...restMovieAndActors,
      releaseDate: release_date.toISOString().split("T")[0],
      genre: genre?.name || "No genre",
      actors: actors.length
        ? actors.map(({ first_name, last_name }) => {
            return `${first_name} ${last_name}`;
          })
        : [],
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getGenres() {
  try {
    return await db.Genre.findAll({
      attributes: ["id", "name"],
      raw: true,
    });
  } catch (error) {
    console.error(error);
    return [];
  }
}

module.exports = {
  getMovieDetails,
  createMovieGet,
  createMoviePost,
  editMovieGet,
  editMoviePut,
  deleteMovie,
};
