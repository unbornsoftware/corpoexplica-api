const {validateBirthdate, validateEmail} = require("../../utils/validationsUtils")

class UserUpdateDTO{

    constructor( user ){
        this.name = user.name;

        if (user.email && user.email.trim() !== "") {
            if (!validateEmail(user.email)) {
                throw new Error("E-mail inválido.");
            }
            this.email = user.email;
        }

        if (user.birthdate && user.birthdate.trim() !== "") {
            if (!validateBirthdate(user.birthdate)) {
                throw new Error("Data de nascimento inválida.");
            }
            this.birthdate = user.birthdate;
        }

        this.profilePicture = user.profilePicture || null;
        this.addresses = user.addresses || null;
        this.contacts = user.contacts || null;
        this.roles = user.roles || null;

    }

}
module.exports = UserUpdateDTO