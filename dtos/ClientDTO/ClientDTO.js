class ClientDTO{
    constructor(client){
        this.id = client.id;
        this.email = client.email;
        this.name = client.name;
        this.birthdate = client.birthdate;
        this.active = client.active;
        this.type = client.type;
        this.documents = client.documents || null;
        this.contacts = client.contacts || null;
        this.roles = client.roles || null;
    }
}

module.exports = ClientDTO;