const express = require("express");


// API Router

const apiRouter = require("./api/api-routes");


const app = express();


const PORT = process.env.PORT || 3000;

app.use(express.json());



app.use("/api/movies", apiRouter); 

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}.`);
});