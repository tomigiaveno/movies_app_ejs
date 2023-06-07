const { Router } = require("express");
const homePageController = require("../controllers/homePage-controller");

const homePageRouter = Router();

homePageRouter.get("/", homePageController.getHomePage);

module.exports = homePageRouter;
