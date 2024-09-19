const ClientService = require("../services/ClientService");
const ClientDTO = require("../dtos/ClientDTO/ClientDTO");

const registerClient = async (req, res) => {
  try {
    const clientDTO = new ClientDTO(req.body);    
    const client = await ClientService.registerClient(clientDTO);
    res.status(201).json(client);
  } catch (error) {
    res.status(422).json({ errors: [error.message] });
  }
};

const updateClient = async (req, res) => {
  try {
    const clientDTO = new ClientDTO(req.body);
    const updateClient = await ClientService.updateClient(req.params.id, clientDTO);
    res.status(201).json(updateClient);
  } catch (error) {
    res.status(422).json({ errors: [error.message] });
  }
};

const getClientById = async (req, res) => {
  try {
    const client = await ClientService.getClientById(req.params.id);
    res.status(201).json(client);
  } catch (error) {
    res.status(422).json({ errors: [error.message] });
  }
};

const getAllClients = async (req, res) => {
  try {
    const clients = await ClientService.getAllClients();
    res.status(201).json(clients);
  } catch (error) {
    res.status(422).json({ errors: [error.message] });
  }
};

const removeClient = async (req, res) => {
  try {
    const client = await ClientService.removeClient(req.params.id);
    res.status(201).json(client);
  } catch (error) {
    res.status(422).json({ errors: [error.message] });
  }
};

module.exports = {
  registerClient,
  updateClient,
  getClientById,
  getAllClients,
  removeClient
};
