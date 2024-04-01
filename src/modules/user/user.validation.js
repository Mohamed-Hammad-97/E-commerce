import Joi from 'joi'

export const addUserSchema = Joi.object({
    title: Joi.string().min(3).max(30).required(),
    image: Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid('image/jpeg', 'image/png', 'image/avif', ' image/jpg').required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
        size: Joi.number().max(5242880).required()
    }).required()
})

export const updateUserSchema = Joi.object({
    title: Joi.string().min(3).max(30).required()
})

export const getUserByIdSchema = Joi.object({
    id: Joi.string().hex().length(24).required()
})

export const updateUserByIdSchema = Joi.object({
    title: Joi.string().min(3).max(30).required(),
    id: Joi.string().hex().length(24).required()
})

export const deleteUserByIdSchema = Joi.object({
    id: Joi.string().hex().length(24).required()
})
