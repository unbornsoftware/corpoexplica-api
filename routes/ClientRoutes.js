const express = require("express");
const router = express();

//Controller
const {registerClient, updateClient, getClientById, removeClient} = require("../controllers/ClientController");

//Middlewares
const {clientCreateValidation, clientUpdateValidation} = require("../middlewares/ClientValidations");
const authGuard = require("../middlewares/authGuard");
const validate = require("../middlewares/handleValidations");

//Routes
router.post("/register", authGuard, clientCreateValidation(), validate, registerClient);
router.put("/update/:id", authGuard, clientUpdateValidation(), validate, updateClient);
router.get("/:id", authGuard, getClientById);
router.delete("/:id", authGuard, removeClient);

module.exports = router;