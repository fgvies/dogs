// usercontroller.js


const { User } = require("../db");
const { Op } = require("sequelize");

const postUserControler = async (
  name,
  lastname,
  username,
  email,
  password,
  phone,
  address,
  status
) => {
  const newUsers = await User.create({
    name,
    lastname,
    username,
    email,
    password,
    phone,
    address,
    status,
  });
  return newUsers;
};

const getUserByName = async (name) => {
  const tolowercaseName = name.toLowerCase();
  const user = await User.findAll({
    where: { name: { [Op.iLike]: "%" + tolowercaseName + "%" } },
  });
  return user;
};

const getAllUsersController = async () => {
  return await User.findAll();
};

module.exports = { postUserControler, getUserByName, getAllUsersController };



// userHandler

const {
  postUserControler,
  getUserByName,
  getAllUsersController,
} = require("../Controllers/userControllers");

const getAllUsers = async (req, res) => {
  const { name } = req.query;
  try {
    const user = name
      ? await getUserByName(name)
      : await getAllUsersController();
    if (user.length == 0) {
      return res
        .status(400)
        .json({ message: "El usuario solicitado no existe" });
    }
    return res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const creatUser = async (req, res) => {
  const { name, lastname, username, email, password, phone, address, status } =
    req.body;
  try {
    const newUsers = await postUserControler(
      name,
      lastname,
      username,
      email,
      password,
      phone,
      address,
      status
    );
    res.status(200).json(newUsers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = { creatUser, getAllUsers };
// servicehandler



const {postServiceController} = require("../Controllers/serviceControllers")


const postServiceHandler = async (req, res) => {
  const { type, name, description, provider, price, image, status } = req.body;
  try {
    const newService = await postServiceController(
      type,
      name,
      description,
      provider,
      price,
      image,
      status
    );
    res.status(200).json(newService);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { postServiceHandler };


// serviceController

const { Service } = require("../db");

const postServiceController = async (
  type,
  name,
  description,
  provider,
  price,
  image,
  status
) => {
  const newService = await Service.create({
    type,
    name,
    description,
    provider,
    price,
    image,
    status,
  });
  return newService;
};

module.exports = {
  postServiceController,
};

