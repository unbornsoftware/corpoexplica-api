const User = require("../models/User");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const authGuard = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    //Check if header has a token (Saber se o cabeçalho da requisição contém o token ou não)
    if(!token) return res.status(401).json({errors: ["Acesso negado!"]});

    //Check if token is valid
    try {
        const verified = jwt.verify(token, jwtSecret);
        req.user = await User.findById(verified.id).select("-password");
        next();
    } catch (error) {
        if(error.name === "TokenExpiredError"){
            return res.status(401).json({errors: ["Token de acesso expirado, por favor faça login novamente."]})
        }else{
            return res.status(401).json({errors: ["Token inválido!"]});
        }
    }
}

module.exports = authGuard;