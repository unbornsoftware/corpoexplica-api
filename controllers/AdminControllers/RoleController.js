const RoleService = require("../../services/AdminServices/RoleServices");
const RoleDTO = require("../../dtos/AdminDTO/RoleDTO");

const createRole = async (req, res) => {
  try {
    const roleDTO = new RoleDTO(req.body);
    const role = await RoleService.createRole(roleDTO);
    res.status(201).json(role);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
};
const updateRole = async (req, res) => {
  try {
    const roleDTO = new RoleDTO(req.body);
    const updatedRole = await RoleService.updateRole(req.params.id, roleDTO);
    res.status(201).json(updatedRole);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
};
const deleteRole = async (req, res) => {
  try {
    const message = await RoleService.deleteRole(req.params.id);
    res.status(201).json(message);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
};
const getAllRoles = async (req, res) => {
  try {
    const roles = await RoleService.getAllRoles();
    res.status(200).json(roles);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
};

const getRoleById = async (req, res) => {
  try {
    const role = await RoleService.getRoleById(req.params.id);
    res.status(201).json(role);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
};

module.exports = {
  createRole,
  updateRole,
  deleteRole,
  getAllRoles,
  getRoleById,
};
