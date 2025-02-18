import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { BOARD_TYPES } from '~/utils/constants'
const createNew = async (req, res, next) => {
    // Tạo regex
    const correctCondition = Joi.object({
        title: Joi.string().min(3).max(50).required().trim().strict().messages({
            'any.required' : 'Tên dự án là bắt buộc',
            'string.empty' : 'Tên dự án không được để trống',
            'string.min' : 'Tên dự án tối thiểu 3 ký tự',
            'string.max' : 'Tên dự án tối đa 50 ký tự',
            'string.trim' : 'Tên dự án không được bắt đầu bằng phím cách'
        }),
        description: Joi.string().min(3).max(255).required().trim().strict().messages({
            'any.required' : 'Mô tả dự án là bắt buộc',
            'string.empty' : 'Mô tả không được để trống',
            'string.min' : 'Mô tả tối thiểu 3 ký tự',
            'string.max' : 'Mô tả tối đa 255 ký tự',
            'string.trim' : 'Mô tả không được bắt đầu bằng phím cách'
        }),
        type: Joi.string().valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE).required()
    })

    try {
        // Kiểm tra dữ liệu FE gửi lên thông qua Joia
        // abortEarly: false để đợi validate tất cả các trường
        await correctCondition.validateAsync(req.body, {
            abortEarly: false
        })
        // Sau khi validate xong thi qua controller
        next()

    } catch (error) {
        next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
    }

}
const update = async (req, res, next) => {
    // Tạo regex
    const correctCondition = Joi.object({
        title: Joi.string().min(3).max(50).trim().strict().messages({
            'any.required' : 'Tên dự án là bắt buộc',
            'string.empty' : 'Tên dự án không được để trống',
            'string.min' : 'Tên dự án tối thiểu 3 ký tự',
            'string.max' : 'Tên dự án tối đa 50 ký tự',
            'string.trim' : 'Tên dự án không được bắt đầu bằng phím cách'
        }),
        description: Joi.string().min(3).max(255).trim().strict().messages({
            'any.required' : 'Mô tả dự án là bắt buộc',
            'string.empty' : 'Mô tả không được để trống',
            'string.min' : 'Mô tả tối thiểu 3 ký tự',
            'string.max' : 'Mô tả tối đa 255 ký tự',
            'string.trim' : 'Mô tả không được bắt đầu bằng phím cách'
        }),
        type: Joi.string().valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE)
    })
    try {
        // Kiểm tra dữ liệu FE gửi lên thông qua Joia
        // abortEarly: false để đợi validate tất cả các trường
        // allowUnknow: cho phép đẩy lên dữ liệu ko cần thiết
        await correctCondition.validateAsync(req.body, {
            abortEarly: false,
            allowUnknown: true
        })
        // Sau khi validate xong thi qua controller
        next()
    } catch (error) {
        next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
    }

}

export const boardValidation = {
    createNew,
    update
}