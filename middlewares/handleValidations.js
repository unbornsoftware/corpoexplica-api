const { validationResult } = require("express-validator");

const validate = (req, res, next) => {

  console.log("Dados recebidos para validação (dentro de handleValidationErrors):", req.body);
  
  const errors = validationResult(req);
  
  if (errors.isEmpty()) {
    return next();
  }
  
  if (!errors.isEmpty()) {
    console.log("Erros de validação:", errors.array());
  }

  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push(err.msg));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = validate;