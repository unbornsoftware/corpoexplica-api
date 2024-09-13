class PermissionDTO{
    constructor(permission){
        this.name = permission.name;
        this.description = permission.description || null;
    }
}
module.exports = PermissionDTO;