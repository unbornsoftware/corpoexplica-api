const { validateEmail} = require("../../utils/validationsUtils")

class UserRegistrationDTO{
    constructor(name, email, password){
        this.name = name;
        if (!validateEmail(email)) {
            throw new Error("E-mail inválido.");
        }
        this.email = email;
        this.password = password;
    }
}

module.exports = UserRegistrationDTO;