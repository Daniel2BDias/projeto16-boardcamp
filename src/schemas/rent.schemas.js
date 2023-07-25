import joi from "joi";

const rentSchema = joi.object().keys({
    customerId: joi.number().integer().positive().min(1).required(),
    gameId: joi.number().integer().positive().min(1).required(),
    daysRented: joi.number().integer().min(1).required(),
  });

  export default rentSchema;