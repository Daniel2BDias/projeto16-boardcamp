import joi from "joi";

const gameSchema = joi.object().keys({
    name: joi.string().required(),
    image: joi.string().domain().required(),
    stockTotal: joi.number().integer().min(0).required(),
    pricePerDay: joi.number().min(0).required(),
  });

  export default gameSchema;