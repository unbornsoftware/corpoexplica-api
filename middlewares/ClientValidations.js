const { body } = require("express-validator");

const clientCreateValidation = () => {
  return [
    body("name")
      .isString()
      .withMessage("O nome é obrigatório")
      .isLength({ min: 3 })
      .withMessage("O nome precisa ter no mínimo 3 caracteres"),
    body("email").isString().withMessage("O e-mail é obrigatório"),
    body("documents")
      .isArray({ min: 1 })
      .withMessage("É necessário pelo menos um documento"),
    body("documents.*.type")
      .isString()
      .withMessage("O tipo do documento é obrigatório")
      .isIn("cpf")
      .withMessage("O tipo do documento deve ser cpf"),
    body("documents.*.value")
      .isString()
      .withMessage("O valor do documento é obrigatório")
      .isLength({ min: 11, max: 11 })
      .withMessage("O CPF deve conter 11 caracteres"),
    body("contacts")
      .optional()
      .isArray({ min: 1 })
      .withMessage("É necessário pelo menos um contato"),
    body("contacts.*.type")
      .optional()
      .isString()
      .withMessage("O tipo de contato é obrigatório")
      .isIn(["cellphone", "telephone", "email", "whatsapp", "telegram"])
      .withMessage("O tipo de contato deve ser um dos valores permitidos"),
    body("contacts.*.value")
      .optional()
      .isString()
      .withMessage("O valor do contato é obrigatório"),
    body("birthday")
      .optional()
      .isDate()
      .withMessage("O data de nascimento deve ser uma data válida"),
    body("active")
      .optional()
      .isBoolean()
      .withMessage("O campo 'Ativo' deve ser booleano"),
  ];
};

const clientUpdateValidation = () => {
  return [
    body("name")
      .optional()
      .isLength({ min: 3 })
      .withMessage("O nome precisa ter no mínimo 3 caracteres."),
    body("documents")
      .optional()
      .isArray({ min: 1 })
      .withMessage("É necessário pelo menos um documento"),
    body("documents.*.type")
      .optional()
      .isString()
      .withMessage("O tipo do documento é obrigatório")
      .isIn("cpf")
      .withMessage("O tipo do documento deve ser cpf"),
    body("documents.*.value")
      .optional()
      .isString()
      .withMessage("O valor do documento é obrigatório")
      .isLength({ min: 11, max: 11 })
      .withMessage("O CPF deve conter 11 caracteres"),
    body("contacts")
      .optional()
      .isArray({ min: 1 })
      .withMessage("É necessário pelo menos um contato"),
    body("contacts.*.type")
      .optional()
      .isString()
      .withMessage("O tipo de contato é obrigatório")
      .isIn(["cellphone", "telephone", "email", "whatsapp", "telegram"])
      .withMessage("O tipo de contato deve ser um dos valores permitidos"),
    body("contacts.*.value")
      .optional()
      .isString()
      .withMessage("O valor do contato é obrigatório"),
    body("birthday")
      .optional()
      .isDate()
      .withMessage("O data de nascimento deve ser uma data válida"),
    body("active")
      .optional()
      .isBoolean()
      .withMessage("O campo 'Ativo' deve ser booleano"),
  ];
};

module.exports = {
  clientCreateValidation,
  clientUpdateValidation,
};
