const express = require("express");
const router = express();
const { PERMISSIONS, ROLES } = require("../../utils/enums");

//Controller
const {createRole, updateRole, deleteRole, getAllRoles, getRoleById} = require("../../controllers/AdminControllers/RoleController");

//Middlewares
const {roleCreateValidation, roleUpdateValidation} = require("../../middlewares/AdminMiddlewares/roleValidations");
const authGuard = require("../../middlewares/authGuard");
const validate = require("../../middlewares/handleValidations");
const {roleAuthorize} = require("../../middlewares/authorizeGuard");

//Routes
router.post("/register", authGuard, roleAuthorize(['Admin']), roleCreateValidation(), validate, createRole);
router.put("/update/:id", authGuard, roleAuthorize(['Admin']), roleUpdateValidation(), validate, updateRole);
router.delete("/:id", authGuard, roleAuthorize(['Admin']), deleteRole);
router.get("/", authGuard, roleAuthorize(['Admin']), getAllRoles);
router.get("/:id", authGuard, roleAuthorize(['Admin']), getRoleById);

module.exports = router;