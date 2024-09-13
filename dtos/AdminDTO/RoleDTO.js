class RoleDTO{
    constructor(role){
        this.name = role.name;
        this.permissions = role.permissions || null;
    }
}
module.exports = RoleDTO;