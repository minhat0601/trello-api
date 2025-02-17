import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { BOARD_TYPES } from '~/utils/constants'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'
const createNew = async (req, res, next) => {
    // Tạo regex
    const correctCondition = Joi.object({
        title: Joi.string().min(3).max(50).required().trim().strict().messages({
            'any.required' : 'Tên cột là bắt buộc',
            'string.empty' : 'Tên cột không được để trống',
            'string.min' : 'Tên cột tối thiểu 3 ký tự',
            'string.max' : 'Tên cột tối đa 50 ký tự',
            'string.trim' : 'Tên cột không được bắt đầu bằng phím cách'
        }),
        boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
        columnId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)

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
export const cardValidation = {
    createNew
}