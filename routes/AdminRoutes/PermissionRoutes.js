const express = require("express");
const router = express();
const { PERMISSIONS, ROLES } = require("../../utils/enums");

//Controller
const {newPermission, updatePermission, deletePermission, getAllPermissions, getPermissionById} = require("../../controllers/AdminControllers/PermissionController");

//Middlewares
const {permissionCreateValidation, permissionUpdateValidation} = require("../../middlewares/AdminMiddlewares/permissionValidations");
const authGuard = require("../../middlewares/authGuard");
const validate = require("../../middlewares/handleValidations");
const {roleAuthorize} = require("../../middlewares/authorizeGuard");

//Routes
router.post("/register", authGuard, roleAuthorize(["Admin"]), permissionCreateValidation(), validate, newPermission);
router.put("/update/:id", authGuard, roleAuthorize(["Admin"]), permissionUpdateValidation(), validate, updatePermission);
router.delete("/:id", authGuard, roleAuthorize(["Admin"]), deletePermission);
router.get("/", authGuard, roleAuthorize(["Admin"]), getAllPermissions);
router.get("/:id", authGuard, roleAuthorize(["Admin"]), getPermissionById);


module.exports = router;