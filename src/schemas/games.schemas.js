import joi from "joi";

const gameSchema = joi.object().keys({
    name: joi.string().required(),
    image: joi.string().uri().required(),
    stockTotal: joi.number().integer().min(1).required(),
    pricePerDay: joi.number().integer().min(1).required(),
  });

  export default gameSchema;