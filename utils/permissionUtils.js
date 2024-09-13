const checkUserPermissions = (roles, requiredPermissions) => {
  return roles.some((role) =>
    role.permissions.some((permission) =>
      requiredPermissions.includes(permission.name)
    )
  );
};
const checkUserRoles = (roles, requiredRole) => {
  return roles.some((role) =>
    requiredRole.includes(role.name)
  );
};

module.exports = {checkUserPermissions, checkUserRoles};
