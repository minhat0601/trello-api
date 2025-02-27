import Joi from 'joi';
import ApiError from '~/utils/ApiError';
import { StatusCodes } from 'http-status-codes';
import { EMAIL_RULE, EMAIL_RULE_MESSAGE, PASSWORD_RULE, PASSWORD_RULE_MESSAGE } from '~/utils/validators';
import { userService } from '~/services/userService';
import ms from 'ms';
const createNew = async (req, res, next) => {
    try {
        const correctCondition = Joi.object({
            email: Joi.string().required().pattern(EMAIL_RULE).messages({
                'string.empty': 'Email không được để trống',
                'string.pattern.base': EMAIL_RULE_MESSAGE,
                'any.required': 'Email là bắt buộc'
            }),
            password: Joi.string().required().pattern(PASSWORD_RULE).messages({
                'string.empty': 'Mật khẩu không được để trống',
                'string.pattern.base': PASSWORD_RULE_MESSAGE,
                'any.required': 'Mật khẩu là bắt buộc'
            }),
            displayName: Joi.string().min(5).max(50).required().messages({
                'string.empty': 'Tên không được để trống',
                'string.min': 'Tên phải có ít nhất 5 ký tự',
                'string.max': 'Tên không được quá 50 ký tự',
                'any.required': 'Tên là bắt buộc'
            })
        });

        await correctCondition.validateAsync(req.body, {
            abortEarly: false
        });
        next();
    } catch (error) {
        console.log(error);
        next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error));
    }
};
const verifyEmail = async (req, res, next) => {
    try {
        const correctCondition = Joi.object({
            email: Joi.string().required().pattern(EMAIL_RULE).messages({
                'string.empty': 'Email không được để trống',
                'string.pattern.base': EMAIL_RULE_MESSAGE,
                'any.required': 'Email là bắt buộc'
            }),
            token: Joi.string().min(5).max(50).required()
        });

        await correctCondition.validateAsync(req.body, {
            abortEarly: false
        })
        next()
    } catch (error) {
        next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error));
    }
}
const login = async (req, res, next) => {
    try {
        const correctCondition = Joi.object({
            email: Joi.string().required().pattern(EMAIL_RULE).messages({
                'string.empty': 'Email không được để trống',
                'string.pattern.base': EMAIL_RULE_MESSAGE,
                'any.required': 'Email là bắt buộc'
            }),
            password: Joi.string().required().messages({
                'any.required': 'Mật khẩu không được để trống'
            })
        })
        await correctCondition.validateAsync(req.body, {
            abortEarly: false
        } )
        next()

    } catch (error) {
        next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error));
    }
}


export const userValidation = {
    createNew,
    verifyEmail,
    login
};