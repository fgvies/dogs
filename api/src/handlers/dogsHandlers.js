const { Temperament } = require("../db");

const {
  getAllDogsController,
  getDogsByNameController,
  getDogById,
  postDogsController,
} = require("../controllers/dogsControllers");

const getDogsHandler = async (req, res) => {
  const { name } = req.query;

  try {
    const results = name
      ? await getDogsByNameController(name)
      : await getAllDogsController();

    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "La raza especificada no existe" });
    }
    return res.status(200).json(results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const getDogsIdHandler = async (req, res) => {
  const { id } = req.params;
  const source = isNaN(id) ? "BD" : "API";

  try {
    const dog = await getDogById(id, source);
    if (!dog) {
      return res.status(404).json({ error: "La raza especificada no existe" });
    }
    return res.status(200).json(dog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const postDogHandler = async (req, res) => {
  const { name, image, height, weight, life_span, temperaments } = req.body;

  try {
    const newDog = await postDogsController(
      name,
      image,
      height,
      weight,
      life_span
    );
    if (
      temperaments &&
      Array.isArray(temperaments) &&
      temperaments.length > 0
    ) {
      const temperamentAssociate = await Temperament.findAll({
        where: { id: temperaments },
      });
      await newDog.setTemperaments(temperamentAssociate);
    }
    return res.status(200).json(newDog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getDogsHandler, getDogsIdHandler, postDogHandler };
