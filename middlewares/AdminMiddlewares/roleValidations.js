const { body } = require("express-validator");

const roleCreateValidation = () => {
  return [
    body("name")
      .isString()
      .withMessage("O nome é obrigatório")
      .isLength({ min: 3 })
      .withMessage("O nome precisa ter no mínimo 3 caracteres"),
  ];
};

const roleUpdateValidation = () => {
  return [
    body("name")
      .optional()
      .isLength({ min: 3 })
      .withMessage("O nome precisa ter no mínimo 3 caracteres."),
  ];
};

module.exports = {
  roleCreateValidation,
  roleUpdateValidation,
};
