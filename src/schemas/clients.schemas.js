import joi from "joi";

const clientSchema = joi.object().keys({
    name: joi.string().required(),
    phone: joi.string().pattern(/^[0-9]+$/, 'numbers').min(10).max(11).required(),
    cpf: joi.string().pattern(/^[0-9]+$/, 'numbers').min(11).max(11).required(),
    birthday: joi.string().min(10).max(10).required()
  });

  export default clientSchema;