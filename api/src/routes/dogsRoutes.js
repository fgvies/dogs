const { Router } = require("express");
const { getDogsHandler, getDogsIdHandler , postDogHandler} = require("../handlers/dogsHandlers")

const dogsRouter = Router();



dogsRouter.get("/", getDogsHandler);
dogsRouter.get("/:id", getDogsIdHandler);
dogsRouter.post("/", postDogHandler);

module.exports = dogsRouter; 
