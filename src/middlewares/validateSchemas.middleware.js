import joi from "joi";


export default function validateSchema (schema) {
    return (req, res, next) => {
        const {error} = joi.validate(req.body, schema);
        if(error) return res.sendStatus(400);
        next();
    }
};