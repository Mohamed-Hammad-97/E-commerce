import Joi from 'joi'

export const addReviewSchema = Joi.object({
    text: Joi.string().min(3).max(300).required(),
    createdBy: Joi.string().hex().length(24).optional(),
    product: Joi.string().hex().length(24).optional(),
})

export const updateReviewSchema = Joi.object({
    text: Joi.string().min(3).max(30).required(),
    id: Joi.string().hex().length(24).required()
})

export const getReviewByIdSchema = Joi.object({
    id: Joi.string().hex().length(24).required()
})

export const updateReviewByIdSchema = Joi.object({
    text: Joi.string().min(3).max(30).required(),
    id: Joi.string().hex().length(24).required()
})

export const deleteReviewByIdSchema = Joi.object({
    id: Joi.string().hex().length(24).required()
})
