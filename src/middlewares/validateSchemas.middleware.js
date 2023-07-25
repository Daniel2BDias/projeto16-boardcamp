import joi from "joi";


export default function validateSchema (schema) {
    return (req, res, next) => {
        const {error} = joi.validate(req.body, schema);
        if(error) return res.status(422).send(error.details.map(detail => detail.message));

        next();
    }
};