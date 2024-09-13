const UserService = require("../services/UserService");
const UserRegistrationDTO = require("../dtos/UserDTO/UserRegistrationDTO");
const UserLoginDTO = require("../dtos/UserDTO/UserLoginDTO");
const UserUpdateDTO = require("../dtos/UserDTO/UserUpdateDTO");

const registerUser = async (req, res) => {
  try {
    console.log("Dados recebidos na controller:", req.body);
    const userDTO = new UserRegistrationDTO(req.body.name, req.body.email, req.body.password);
    const user = await UserService.registerUser(userDTO);
    res.status(201).json(user);
  } catch (error) {
    res.status(422).json({ errors: [error.message] });
  }
};

const login = async (req, res) => {
  try {
    const userDTO = new UserLoginDTO(req.body.email, req.body.password);
    const user = await UserService.login(userDTO);
    res.status(201).json(user);
  } catch (error) {
    res.status(422).json({ errors: [error.message] });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const user = await UserService.getCurrentUser(req.user);
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ errors: [error.message] });
  }
};

const updateUser = async (req, res) => {
  try {
    const userDTO = new UserUpdateDTO(req.body, req.user);
    const updatedUser = await UserService.updateUser(req.user, userDTO);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ errors: [error.message] });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await UserService.getUserById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ errors: [error.message] });
  }
};

module.exports = {
  registerUser,
  login,
  getCurrentUser,
  updateUser,
  getUserById,
};