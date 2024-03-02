const express = require("express");
const cors = require("cors");
const recipeRoutes = require("./routes/recipe-routes");

const app = express();

// requestin body kismina erismek (requesin json verisini isler):
app.use(express.json())

// middelware
app.use(cors());

// middelware: api route tanimi
app.use(recipeRoutes);

app.listen(4000, () => {
  console.log("server port listens on port 4000");
});
