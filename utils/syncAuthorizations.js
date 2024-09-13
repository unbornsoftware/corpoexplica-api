const Permission = require("../models/AdminModels/Permission");
const Role = require("../models/AdminModels/Role");
const { PERMISSIONS, ROLES } = require("../utils/enums");

const syncAuthorizations = async () => {
  try {

    const permissions = await Permission.find();
    permissions.forEach((permission) => {
      PERMISSIONS[permission.name.toUpperCase()] = permission.name;
    });

    const roles = await Role.find();
    roles.forEach((role) => {
      ROLES[role.name.toUpperCase()] = role.name;
    });

    console.log("Autorizações sincronizadas");
    console.log(PERMISSIONS);
    console.log(ROLES);
  } catch (error) {
    console.error("Erro ao sincronizar as autorizações:", error);
  }
};

module.exports = syncAuthorizations;
