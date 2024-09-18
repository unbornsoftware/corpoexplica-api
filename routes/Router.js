const express = require("express");
const router = express();
const { ROLES } = require("../utils/enums");
const { roleAuthorize } = require("../middlewares/authorizeGuard");

// SYSTEM
router.use("/api/users", require("./UserRoutes"));

// CLIENTS
router.use("/api/clients", require("./ClientRoutes"));

// ADMIN
router.use("/api/permissions", require("./AdminRoutes/PermissionRoutes"));
router.use("/api/roles", require("./AdminRoutes/RoleRoutes"));

//Test route
router.get("/", (req, res) => {
    res.send("API WORKING");
})

module.exports = router