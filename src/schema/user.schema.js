import joi from "joi"

export const registerSchema = joi.object({
    name: joi.string().min(3).required(),
    email: joi.string().email().required(),
    password: joi.string().min(3).required(),
});

export const loginSchema = joi.object({
    token: joi.string().min(36),
    email: joi.string().email(),
    password: joi.string().min(3)
})