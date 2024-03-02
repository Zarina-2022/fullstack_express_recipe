const { getData } = require("../utils/getData");

const data = getData();

exports.controlId = (req, res, next) => {
  const recipe = data.find((i) => i.id === req.params.id);

  // Validation
  // hata varsa hatayi goster
  if (!recipe) {
    return next(
      res
        .status(404)
        .json({ message: "The recipe you were looking for was not found." })
    );
  }
  // recipe bilgilerinin meddelwareden bir sonraki adimda erisilebilir olmasi icin req in icerisine veriyi ekliyoruz:
  req.recipe = recipe;

  // hata yoksa bir sonraki adima gec
  next();
};
