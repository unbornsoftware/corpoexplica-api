const { default: mongoose } = require("mongoose");
const Role = require("../../models/AdminModels/Role");
const RoleDTO = require("../../dtos/AdminDTO/RoleDTO");

class RoleService {
  static async createRole(roleDTO) {
    const roleExists = await Role.findOne({ name: roleDTO.name });
    if (roleExists) {
      throw new Error("Este papel já existe");
    }
    const role = new Role({
      name: roleDTO.name,
      permissions: roleDTO.permissions,
    });
    const newRole = await role.save();
    return new RoleDTO(newRole);
  }

  static async updateRole(roleId, roleDTO) {
    const role = await Role.findById(new mongoose.Types.ObjectId(roleId));
    if (!role) {
      throw new Error("Papel não econtrado!");
    }
    role.name = roleDTO.name || role.name;
    role.permissions = roleDTO.permissions || role.permissions;
    const updatedRole = await role.save();
    return new RoleDTO(updatedRole);
  }

  static async deleteRole(roleId) {
    const role = await Role.findById(new mongoose.Types.ObjectId(roleId));
    if (!role) {
      throw new Error("Papel não encontrado!");
    }
    await Role.findByIdAndDelete(role._id);
    return { message: "Papel removido com sucesso!" };
  }

  static async getAllRoles() {
    const roles = await Role.find().populate("permissions");
    if (roles.length === 0) {
      throw new Error("Nenhum papel encontrado!");
    }

    const rolesDTO = roles.map((role) => new RoleDTO(role));

    return rolesDTO;
  }

  static async getRoleById(roleId) {
    const role = await Role.findById(new mongoose.Types.ObjectId(roleId)).populate(
      "permissions"
    );
    if (role.length === 0) {
      throw new Error("Nenhum papel encontrado!");
    }
    return new RoleDTO(role);
  }
}

module.exports = RoleService;
