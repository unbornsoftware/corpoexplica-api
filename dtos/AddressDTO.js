class AddressDTO{
    constructor(address){
        this.street = address.street;
        this.city = address.city;
        this.state = address.state;
        this.postalCode = address.postalCode;
        this.country = address.country;
    }
}
module.exports = AddressDTO;