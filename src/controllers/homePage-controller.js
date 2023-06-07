const db = require("../../database/models");

const getHomePage = async (req, res) => {
  try {
    const movies = await db.Movie.findAll({
      include: [
        {
          association: "genre",
          attributes: ["name"],
        },
      ],
      raw: true,
      nest: true,
    });

    if (!movies.length) {
      return res.status(404).render("homePage", { movies: [] });
    }

    const mappedMovies = movies.map(({ release_date, genre, ...restMovie }) => {
      return {
        ...restMovie,
        releaseDate: release_date.getFullYear(),
        genre: genre.name || "No genre",
      };
    });

    res.status(200).render("homePage", { movies: mappedMovies });
  } catch (error) {
    console.error(error);
    res.status(500).render("homePage", { movies: [] });
  }
};

module.exports = {
  getHomePage,
};
