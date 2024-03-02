const express = require("express");
const {getAllRecipes, getRecipe, createRecipe, deleteRecipe} = require("../controllers/recipeController")
const { controlId } = require( "../middelware");

// Router => server.js dosyasi disarisinda route tanimi yapmamiza olanak saglar.
const router = express.Router();

// olusturdugumuz routerin yollarini ve calisacak fonksiyonlari tanimlamak lazim:
router.route("/api/recipes").get(getAllRecipes).post(createRecipe);
router.route("/api/recipes/:id").get(controlId, getRecipe).delete(controlId, deleteRecipe);

module.exports = router;



