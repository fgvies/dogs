require("dotenv").config();
const {API_KEY} = process.env;
const axios = require("axios");
const { Temperament } = require("../db");

const getTemperamentsController = async () => {
  try {
    const response = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    const uniqueTemperaments = new Set();

    response.data.forEach((dog) => {
      if (dog.temperament) {
        const temperaments = dog.temperament.split(", ");
        temperaments.forEach((temperament) => {
          uniqueTemperaments.add(temperament);
        });
      }
    });

    const saveTemperaments = [];

    for (const temperament of uniqueTemperaments) {
      const saveTemperament = await Temperament.findOrCreate({
        where: { name: temperament },
      });
      saveTemperaments.push(saveTemperament[0]);
    }
    return saveTemperaments;
    
  } catch (error) {
    throw new Error("No se encontraron temperamentos");
  }
};
module.exports = { getTemperamentsController };
