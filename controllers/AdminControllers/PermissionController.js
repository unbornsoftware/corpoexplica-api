const PermissionService = require("../../services/AdminServices/PermissionServices");
const PermissionDTO = require("../../dtos/AdminDTO/PermissionDTO.js");

const newPermission = async (req, res) => {

  console.log("Dados recebidos na controller:", req.body);

  try {
    const permissionDTO = new PermissionDTO(req.body);
    const permission = await PermissionService.createPermission(permissionDTO);
    res.status(201).json(permission);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
};

const updatePermission = async (req, res) => {
  try {
    const permissionDTO = new PermissionDTO(req.body);
    const updatedPermission = await PermissionService.updatePermission(req.params.id,permissionDTO);
    res.status(200).json(updatedPermission);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
};

const deletePermission = async (req, res) => {
  try {
    const message = await PermissionService.deletePermission(req.params.id);
    res.status(200).json(message);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
};

const getAllPermissions = async (req, res) => {
  try {
    const permissions = await PermissionService.getAllPermissions();
    res.status(200).json(permissions);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
};

const getPermissionById = async (req, res) => {
  try {
    const permission = await PermissionService.getPermissionById(req.params.id);
    res.status(200).json(permission);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
};

module.exports = {
  newPermission,
  updatePermission,
  deletePermission,
  getAllPermissions,
  getPermissionById,
};
