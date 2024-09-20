class ClientDTO{
    constructor(client){
        this.id = client.id;
        this.name = client.name;
        this.birthday = client.birthday;
        this.active = client.active;
        this.type = client.type;
        this.documents = client.documents || null;
        this.contacts = client.contacts || null;
        this.roles = client.roles || null;
    }
}

module.exports = ClientDTO;