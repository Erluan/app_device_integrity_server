// Validation
const Joi = require('joi');

// Token Validation
exports.attestTokenValidation = (data) => {

    const schema = Joi.object({
        challenge: Joi.string().min(3).required(),
        attestToken: Joi.string().min(3).required(),
        platform: Joi.string().min(3).required(),
        keyId: Joi.string().optional(),
    });

    return schema.validate(data);

}