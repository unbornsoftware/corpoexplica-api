const { default: mongoose } = require("mongoose");
const Permission = require("../../models/AdminModels/Permission");
const PermissionDTO = require("../../dtos/AdminDTO/PermissionDTO.js");

class PermissionService {

  static async createPermission(permissionDTO) {

    console.log("Dados recebidos no serviço:", permissionDTO);

    const permissionExists = await Permission.findOne({name: permissionDTO.name,});
    if (permissionExists) {
      throw new Error("Essa permissão já existe!");
    }
    const permission = new Permission({
      name: permissionDTO.name,
      description: permissionDTO.description,
    });
    const newPermission = await permission.save();
    return new PermissionDTO(newPermission);
  }

  static async updatePermission(permissionId, permissionDTO){
    const permission = await Permission.findById(new mongoose.Types.ObjectId(permissionId));
    if(!permission){
        throw new Error("Permissão não encontrada!");
    }
    permission.name = permissionDTO.name || permission.name;
    permission.description = permissionDTO.description || permission.description;
    const updatedPermission = await permission.save();

    return new PermissionDTO(updatedPermission);
  }

  static async deletePermission(permissionId){
    const permission = await Permission.findById(new mongoose.Types.ObjectId(permissionId));
    if(!permission){
        throw new Error("Permissão não encontrada!");
    }
    await Permission.findByIdAndDelete(permission._id);
    return { message: "Permissão removida com sucesso" };
  }

  static async getAllPermissions() {

    const permissions = await Permission.find();
    if(permissions.length === 0){
      throw new Error("Nenhuma permissão encontrada!");
    }
    
    const permissionsDTO = permissions.map(permission => new PermissionDTO(permission));

    return permissionsDTO;

  }

  static async getPermissionById(permissionId) {

    const permission = await Permission.findById(new mongoose.Types.ObjectId(permissionId));
    if(permission.length === 0){
      throw new Error("Nenhuma permissão encontrada!");
    }
    return new PermissionDTO(permission);

  }
  
}


module.exports = PermissionService;