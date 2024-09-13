class UserProfileDTO{
    constructor(user){
        this.name = user.name;
        this.email = user.email;
        this.birthdate = user.birthdate;
        this.profilePicture = user.profilePicture;
        this.roles = user.roles;
        this.address = user.addresses;
        this.contacts = user.contacts;
    }
}

module.exports = UserProfileDTO;