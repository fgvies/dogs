const { Dog, Temperament } = require("../db");
require("dotenv").config();
const {API_KEY} = process.env;
const axios = require("axios");
const { Op } = require("sequelize");

const cleanArray = (array) =>
  array.map((element) => {
    return {
      id: element.id,
      name: element.name,
      image:
        element.image && element.image.url
          ? element.image.url
          : element.reference_image_id
          ? `https://cdn2.thedogapi.com/images/${element.reference_image_id}.jpg`
          : null,
      height: element.height?.metric || "",
      weight: element.weight?.metric || "",
      life_span: element.life_span,
      created: false,
      temperaments: element.temperament ? element.temperament.split(", ") : [],
    };
  });

const getDogsByNameController = async (name) => {
  const tolowercaseName = name.toLowerCase();
  const dogsDataBase = await Dog.findAll({
    where: { name: { [Op.iLike]: "%" + tolowercaseName + "%" } },
    include: Temperament,
  });

  const dogsDataBaseByNameClean = dogsDataBase.map((dog) => {
    const dogsWithTemperamentName = dog.temperaments.map(
      (temperament) => temperament.name
    );
    return {
      id: dog.id,
      image: dog.image,
      name: dog.name,
      height: dog.height,
      weight: dog.weight,
      life_span: dog.life_span,
      created: true,
      temperaments: dogsWithTemperamentName,
    };
  });

  const allDogsApiRaw = (await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`))
    .data;
  const allDogsResults = cleanArray(allDogsApiRaw);

  const allDogsResultByName = allDogsResults.filter((elem) =>
    elem.name.toLowerCase().includes(tolowercaseName)
  );

  return [...dogsDataBaseByNameClean, ...allDogsResultByName];
};

const getAllDogsController = async () => {
  const dogsFromDataBase = await Dog.findAll({
    include: [
      {
        model: Temperament,
      },
    ],
  });
  const dogsFromdatacaseClean = dogsFromDataBase.map((dog) => {
    const temperamentNames = dog.temperaments.map(
      (temperament) => temperament.name
    );
    return {
      id: dog.id,
      image: dog.image,
      name: dog.name,
      height: dog.height,
      weight: dog.weight,
      life_span: dog.life_span,
      created: true,
      temperaments: temperamentNames,
    };
  });

  const dogsFromApiRaw = (
    await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
  ).data;
  const apiDogs = cleanArray(dogsFromApiRaw);
  return [...dogsFromdatacaseClean, ...apiDogs];
};
// https://api.thedogapi.com/v1/breeds/search?q=${id}
// https://api.thedogapi.com/v1/breeds/${id}

const getDogById = async (id, source) => {
  let dogData;
  if (source === "API") {
    dogData =( await axios.get(`https://api.thedogapi.com/v1/breeds/${id}`)
    ).data;
    
    const cleanedData = cleanArray([dogData]);
    return cleanedData[0];
  } else {
    dogData = await Dog.findOne({
      where: { id },
      include: [{ model: Temperament, through: 'dog_temperament' }],
    });
    return dogData;
  }
};

const postDogsController = async (name, image, height, weight, life_span) => {
  const newDog = await Dog.create({
    name,
    image,
    height,
    weight,
    life_span,
  });

  return newDog;
};

module.exports = {
  getAllDogsController,
  getDogsByNameController,
  getDogById,
  postDogsController,
};
