import joi from "joi";

const clientSchema = joi.object().keys({
    name: joi.string().required(),
    phone: joi.string().pattern(/^[0-9]+$/, 'numbers').min(10).max(11).required(),
    cpf: joi.string().pattern(/^[0-9]+$/, 'numbers').min(11).max(11).required(),
    birthday: joi.string().pattern(/\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])*/).min(10).max(10).required()
  });

  export default clientSchema;