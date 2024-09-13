const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const UserProfileDTO = require("../dtos/UserDTO/UserProfileDTO");
const Role = require("../models/AdminModels/Role");
const Address = require("../models/Address");
const Contact = require("../models/Contact");
const AddressDTO = require("../dtos/AddressDTO");
const ContactDTO = require("../dtos/ContactDTO");

const jwtSecret = process.env.JWT_SECRET;

class UserService {

  static async generateToken(id) {
    return jwt.sign({ id }, jwtSecret, { expiresIn: "1d" });
  }

  static async registerUser(userDTO) {


    console.log("Dados recebidos no serviço:", userDTO);

    //check if user exists
    const userExists = await User.findOne({ email: userDTO.email });
    if (userExists) {
      throw new Error("Este e-mail já está sendo utilizado");
    }

    //Generate password hash
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(userDTO.password, salt);

    //Roles default
    const defaultRole = await Role.findOne({name: "User"});

    if(!defaultRole){
      throw new Error("Houve um erro inesperado, por favor entre em contato com o suporte!");
    }

    //Check user creation
    const newUser = await User.create({
      name: userDTO.name,
      email: userDTO.email,
      password: passwordHash,
      roles: [defaultRole._id],
    });

    //Verify
    if (!newUser) {
      throw new Error("Houve um erro, por favor tente novamente mais tarde.");
    }

    return {
      _id: newUser._id,
      name: (await newUser).name,
      token: this.generateToken(newUser._id),
    };
  }

  static async login(userDTO) {
    // Check if user exists
    const user = await User.findOne({ email: userDTO.email });
    if (!user) {
      throw new Error("Nenhum usuário encontrado com esse e-mail");
    }

    // Check if password matches
    const isPasswordValid = await bcrypt.compare(
      userDTO.password,
      user.password
    );
    if (!isPasswordValid) {
      throw new Error("Senha incorreta");
    }

    // Geração do token
    const token = await this.generateToken(user._id);

    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePicture: user.profilePicture,
      token: token,
    };
  }

  static async getCurrentUser(user) {
    if (!user) {
      throw new Error("Usuário não autenticado.");
    }

    return new UserProfileDTO(user);
  }

  static async updateUser(currentUser, userDTO) {
    const user = await User.findById(currentUser._id).select("-password");
    if (!user) {
      throw new Error("Usuário não encontrado!");
    }

    
    // Update user fields
    if (userDTO.name) user.name = userDTO.name;
    if (userDTO.email) user.email = userDTO.email;
    if (userDTO.birthdate) user.birthdate = userDTO.birthdate;
    if (userDTO.profilePicture) user.profilePicture = userDTO.profilePicture;
    if (userDTO.roles) user.roles = userDTO.roles;

    if (userDTO.addresses && Array.isArray(userDTO.addresses)) {
      const addressIds = [];

      for (let addressData of userDTO.addresses) {
        const addressDTO = new AddressDTO(addressData);
        let address;

        if (addressDTO._id) {
          address = await Address.findById(addressDTO._id);
          if (!address) {
            throw new Error("Endereço não encontrado!");
          }
          address.street = addressDTO.street;
          address.city = addressDTO.city;
          address.state = addressDTO.state;
          address.postalCode = addressDTO.postalCode;
          address.country = addressDTO.country;
        } else {
          address = new Address({
            ...addressDTO,            
            user: user._id,
          });
        }

        await address.save();
        addressIds.push(address._id);
      }

      user.addresses = addressIds;
    }

    if (userDTO.contacts && Array.isArray(userDTO.contacts)) {
      const contactIds = [];

      for (let contactData of userDTO.contacts) {
        const contactDTO = new ContactDTO(contactData);
        let contact;

        if (contactDTO._id) {
          contact = await Contact.findById(contactDTO._id);
          if (!contact) {
            throw new Error("Contato não encontrado!");
          }
          contact.type = contactDTO.type;
          contact.value = contactDTO.value;
        } else {
          contact = new Contact({
            ...contactDTO,
            userType: "User",
            user: user._id,
          });
        }

        await contact.save();
        contactIds.push(contact._id);
      }

      user.contacts = contactIds;
    }

    if (userDTO.roles && Array.isArray(userDTO.roles)){
      const rolesIds = [];
      for(let roleId of userDTO.roles){
        if(mongoose.Types.ObjectId.isValid(roleId)){
          const role = await Role.findById(roleId);
          if(!role){
            throw new Error(`Papel com ID ${roleId} não foi encontrado!`);
          }
          rolesIds.push(role._id);
        }else{
          throw new Error(`ID do papel inválido: ${roleId}`);
        }
      }
      user.roles = rolesIds;
    }

    const updatedUser = await user.save();
    return new UserProfileDTO(updatedUser);
  }

  static async getUserById(id) {
    const user = await User.findById(new mongoose.Types.ObjectId(id)).select(
      "-password"
    );

    if (!user) {
      throw new Error("Usuário não encontrado!");
    }

    return new UserProfileDTO(user);
  }

}

module.exports = UserService;
