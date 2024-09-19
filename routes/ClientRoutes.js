const express = require("express");
const router = express();

//Controller
const {registerClient, updateClient, getClientById, getAllClients, removeClient} = require("../controllers/ClientController");

//Middlewares
const {clientCreateValidation, clientUpdateValidation} = require("../middlewares/ClientValidations");
const authGuard = require("../middlewares/authGuard");
const validate = require("../middlewares/handleValidations");
const {roleAuthorize} = require("../middlewares/authorizeGuard");

//Routes
router.post("/register", authGuard, roleAuthorize(['Admin']), clientCreateValidation(), validate, registerClient);
router.put("/update/:id", authGuard, roleAuthorize(['Admin']), clientUpdateValidation(), validate, updateClient);
router.get("/:id", authGuard, roleAuthorize(['Admin']), getClientById);
router.get("/", authGuard, roleAuthorize(['Admin']), getAllClients);
router.delete("/:id", authGuard, roleAuthorize(['Admin']), removeClient);

module.exports = router;