class ClientDTO{
    constructor(client){
        this.name = client.name;
        this.documents = client.documents || null;
        this.contacts = client.contacts || null;
        this.roles = client.roles || null;
    }
}

module.exports = ClientDTO;