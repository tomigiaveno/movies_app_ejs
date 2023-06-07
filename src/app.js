const path = require("path");
const express = require("express");
const methodOverride = require("method-override");

// Routers
const homePageRouter = require("./routes/homePage-routes");
const movieRouter = require("./routes/movie-routes");

const app = express();
const PORT = process.env.PORT || 3000;

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static files
app.use(express.static(path.join(__dirname, "..", "public")));

// Body-parser middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Method-override middleware
app.use(methodOverride("_method"));

// Implement routers
app.use("/", homePageRouter);
app.use("/movies", movieRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
