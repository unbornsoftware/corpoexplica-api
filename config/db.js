const mongoose = require("mongoose");

//connection
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

const conn =  async () => {
    try{
        const dbConn = await mongoose.connect(
            `mongodb+srv://${dbUser}:${dbPassword}@corpoexplica.3phm4.mongodb.net/?retryWrites=true&w=majority&appName=Corpoexplica` 
        )
        return dbConn
    }catch(error){
        console.error("Erro ao conectar ao banco: ", error)
    }
}

module.exports = conn();