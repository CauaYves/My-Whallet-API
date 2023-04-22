import joi from "joi"

export const registerSchema = joi.object({
    name: joi.string().min(3).required(),
    email: joi.string().email().required(),
    password: joi.string().min(3).required(),
});

export const loginSchema = joi.object({
    email: joi.string().email(),
    password: joi.string().min(3)
})

export const entrySchema = joi.object({
    value: joi.number().positive().precision(2).strict().required(),
    type: joi.string().required(),
    description: joi.string().required()
})