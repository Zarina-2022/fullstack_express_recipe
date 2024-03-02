const { getData } = require("../utils/getData");
const { setData } = require("../utils/setData");
const crypto = require("crypto");


let data = getData();

exports.getAllRecipes = (req, res) => {
  // data yi buraya copyalayalim
  let recipes = [...data];

  // aratilan kelimeyi bul: (? isareti=> recipeName olmaya da bilir:)
  const searchedTerm = req.query?.recipeName?.trim().toLowerCase();

  // siralama parametresine eriselim:
  const order = req.query.order;

  // bu kelimenin gecen yerleri filtreleyip goster:
  if (searchedTerm) {
    recipes = data.filter((recipe) =>
      recipe.recipeName.toLowerCase().includes(searchedTerm)
    );
  }

  // eger ki order varsa (azalan veya yuklelen sureye gore) siraylamayi gonder:
  if (order) {
    recipes.sort((a, b) =>
      order === "asc"
        ? a.recipeTime - b.recipeTime
        : b.recipeTime - a.recipeTime
    );
  }

  // bu kelime yoksa hepsini goster:
  res.status(200).json({
    message: "The recipes have been sent successfully",
    quantity: recipes.length,
    recipes: recipes,
  });
};

exports.getRecipe = (req, res) => {
  // send response
  res.status(200).json({
    message: "The recipe you were looking for is found.",
    // controlId middelware deki recipe bilgisi req .recipe:
    recipe: req.recipe,
  });
};

exports.createRecipe = (req, res) => {
  // requestin body ile gelen dataya erismem lazim:
  const newRecipe = req.body;

  // Validation:
  // gelen datanin butun tanimlari tamamlanmis mi:
  if (
    !newRecipe.recipeName ||
    !newRecipe.recipeTime ||
    !newRecipe.ingredients ||
    !newRecipe.instructions ||
    !newRecipe.image
  ) {
    return res.status(400).json({ message: "Please define all values." });
  }

  // data ya id eklemem lazim
  newRecipe.id = crypto.randomUUID();

  // diziyi update yapmam lazim: yeni recipe eklemem lazim listeye:
  data.push(newRecipe);

  // yapilanlarin kalici olmasi icin json dosyasini update yapmam lazim:
  setData(data);

  // cevap gonder:
  return res.status(201).json({ message: "New recipe added.", quantity: data.length, recipe: data});
};

exports.deleteRecipe = (req, res) => {
// id si silinmesi gereken recipe silinecek bunu da filter veya splice ile yapabiliriz:
// splice kullanalim. 
// Bunun icin silinecek recipe nin sirasini soruyor, bunu da:
const index = data.findIndex((i) => i.id == req.params.id)

// artik silebiliriz bu elemani:
// index=> silinecek elemanin sirasi
// 1 => silmek istedi eleman sayisi
data.splice(index,1)

// json dosyasini guncelle:
setData(data)

  // send response
  res.status(204).json({message:"Deleted successfully."})
};