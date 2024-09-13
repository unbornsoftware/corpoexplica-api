const { default: mongoose } = require("mongoose");
const User = require("../models/User");
const Role = require("../models/AdminModels/Role");
const {checkUserPermissions, checkUserRoles} = require("../utils/permissionUtils");
const logger = require('../utils/logger');
const { PERMISSIONS, ROLES } = require("../utils/enums");

const permissionAuthorize = (requiredPermissions = []) => {
  return async (req, res, next) => {
    
    try {
      const user = await User.findById(new mongoose.Types.ObjectId(req.user._id)).populate('roles');
      if (!user || !user.roles) {
        logger.error(`Acesso negado. Usuário ID: ${req.user._id}`);
        return res.status(403).json({ error: "Acesso negado." });
      }
      const rolesWithPermissions = await Role.find({ _id: { $in: user.roles } }).populate('permissions');
      const hasPermission = checkUserPermissions(rolesWithPermissions, requiredPermissions);
      if (!hasPermission) {
        logger.error(`Permissão negada. Usuário ID: ${req.user._id}, Permissões: ${requiredPermissions}`);
        return res.status(403).json({ error: "Você não tem permissão para acessar essa área!" });
      }
      next();
    } catch (error) {
      logger.error(`Erro ao processar autorização. Usuário ID: ${req.user._id}, Erro: ${error.message}`);
      return res.status(500).json({ error: "Erro interno no servidor." });
    }
  };
};

const roleAuthorize = (requiredRole = []) => {
  
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.user._id).populate('roles');
      const hasRequiredRole = checkUserRoles(user.roles, requiredRole);
      if (!hasRequiredRole) {
        logger.error(`Permissão negada. Usuário ID: ${req.user._id}, Role: ${requiredRole}`);
        return res.status(403).json({ error: "Acesso negado." });
      }
      next();
    } catch (error) {
      logger.error(`Erro ao processar autorização. Usuário ID: ${req.user._id}, Erro: ${error.message}`);
      return res.status(500).json({ error: "Erro interno no servidor." });
    }

  }

}

module.exports = {
  permissionAuthorize,
  roleAuthorize,
};
