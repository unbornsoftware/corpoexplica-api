const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const Client = require("../models/Client");
const ClientDTO = require("../dtos/ClientDTO/ClientDTO");
const Contact = require("../models/Contact");
const ContactDTO = require("../dtos/ContactDTO");
const { off } = require("../models/User");

class ClientService {
  static async registerClient(clientDTO) {
    //console.log("Dados recebidos na controller:", clientDTO);

    //Search clients with document cpf
    const clientsWithCpf = await Client.find({
      documents: { $elemMatch: { type: "cpf" } },
    });

    //Verify client exists
    for (const client of clientsWithCpf) {
      for (const document of client.documents) {
        if (document.type === "cpf") {
          const isMatch = await bcrypt.compare(
            clientDTO.documents[0].value,
            document.value
          );
          if (isMatch) {
            throw new Error("Este cpf já está sendo utilizado");
          }
        }
      }
    }

    // Generate document hash
    const salt = await bcrypt.genSalt();
    const documentHash = await bcrypt.hash(clientDTO.documents[0].value, salt);

    // Register the client
    const newClient = await Client.create({
      name: clientDTO.name,
      documents: [
        {
          type: "cpf",
          value: documentHash,
        },
      ],
    });

    //Verify
    if (!newClient) {
      throw new Error("Houve um erro, por favor tente novamente mais tarde.");
    }

    //Create contacts client
    if (clientDTO.contacts && Array.isArray(clientDTO.contacts)) {
      const contactsIds = [];
      for (let contactData of clientDTO.contacts) {
        const contactDTO = new ContactDTO(contactData);
        let contact;
        contact = new Contact({
          ...contactDTO,
          userType: "Especialist",
          user: newClient._id,
        });
        await contact.save();
        contactsIds.push(contact._id);
      }
      newClient.contacts = contactsIds;
      await newClient.save();
    }

    return newClient;
  }

  static async updateClient(id, clientDTO) {
    const client = await Client.findById(id);

    console.log("Dados recebidos no serviço:", clientDTO);

    if (!client) {
      throw new Error("Cliente não encontrado!");
    }

    //Update
    if (clientDTO.name) client.name = clientDTO.name;
    if (clientDTO.roles) client.roles = clientDTO.roles;

    if (clientDTO.contacts && Array.isArray(clientDTO.contacts)) {
      const contactIds = [];

      for (let contactData of clientDTO.contacts) {
        const contactDTO = new ContactDTO(contactData);
        let contact;

        if (mongoose.Types.ObjectId.isValid(contactDTO._id)) {
          contact = await Contact.findById(contactDTO._id);
          if (!contact) {
            throw new Error("Contato não encontrado!");
          }
          contact.type = contactDTO.type;
          contact.value = contactDTO.value;
        } else {
          contact = new Contact({
            ...contactDTO,
            userType: "Client",
            user: client._id,
          });
        }

        await contact.save();
        contactIds.push(contact._id);
      }

      client.contacts = contactIds;
    }

    const updatedClient = await client.save();

    const clientWithoutCpf = {
      ...updatedClient._doc,
      documents: updatedClient.documents.filter((doc) => doc.type !== "cpf"),
    };

    return new ClientDTO(clientWithoutCpf);
  }

  static async getClientById(id) {
    const client = await Client.findById(new mongoose.Types.ObjectId(id));

    if (!client) {
      throw new Error("Cliente não encontrado!");
    }

    client.documents = client.documents.filter((doc) => doc.type !== "cpf");

    return new ClientDTO(client);
  }

  static async getAllClients() {
    const clients = await Client.find({})
      .populate({path: "contacts",})
      .populate({path: "roles", select: "name",})
      .select("-documents")
      .sort([["createdAt", -1]])
      .exec();

    if (!clients) {
      throw new Error("Nenhum cliente encontrado!");
    }

    const clientsDTO = clients.map((client) => new ClientDTO(client));

    return clientsDTO;
  }

  static async removeClient(id) {
    const client = await Client.findById(new mongoose.Types.ObjectId(id));

    if (!client) {
      throw new Error("Cliente não encontrado!");
    }

    await Client.findByIdAndDelete(client._id);
  }
}

module.exports = ClientService;
