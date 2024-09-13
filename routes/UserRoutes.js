const express = require("express");
const router = express();

//Controller
const { registerUser, login, getCurrentUser, updateUser, getUserById } = require("../controllers/UserController");

//Middlewares
const {userCreateValidation, loginValidation, userUpdateValidation} = require("../middlewares/userValidations")
const authGuard = require("../middlewares/authGuard");
const validate = require("../middlewares/handleValidations");

//Routes
router.post("/register", userCreateValidation(), validate, registerUser);
router.get("/profile", authGuard, getCurrentUser);
router.post("/login", loginValidation(), validate, login);
router.put("/update", authGuard, userUpdateValidation(), validate, updateUser);
router.get("/:id", authGuard, getUserById);

module.exports = router;