/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import Joi from "joi"
import { ObjectId } from 'mongodb'
// Import pattern để check kiểu dữ liệu ObjectId Dành cho mongoDB
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'
import { GET_DB } from "~/config/mongodb"
import { BOARD_TYPES } from '~/utils/constants'
import { columnModel } from "./columnModel"
import { cardModel } from "./cardModel"
// Define colletion (name & schema)

const BOARD_COLLECTION_NAME = 'boards'
const BOARD_COLLECTION_SCHEMA = Joi.object({
    title: Joi.string().min(3).max(50).required().trim().strict(),
    slug: Joi.string().min(3).required().trim().strict(),
    description: Joi.string().min(3).max(255).required().trim().strict(),
    columnOrderIds: Joi.array().items(
        Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
    ).default([]),
    createdAt: Joi.date().timestamp('javascript').default(Date.now),
    updatedAt: Joi.date().timestamp('javascript').default(null),
    _destroy: Joi.boolean().default(false),
    type: Joi.string().valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE).required()
})

const validateBeforeCreate = async (data) =>{
    return await BOARD_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
    try {
        const validData = await validateBeforeCreate(data)
        const createdBoard = await GET_DB().collection(BOARD_COLLECTION_NAME).insertOne(validData)
        return createdBoard
    } catch (error) {
        throw new Error(error)
    }
}

const findOneById = async (id) => {
    try {
        // console.log(id)

        const result = await GET_DB().collection(BOARD_COLLECTION_NAME).findOne({
            _id: new ObjectId(id)
        })
        return result
    } catch (error) {
        throw new Error(error)
    }
}

const getDetails = async (id) => {
    try {
        // const result = await GET_DB().collection(BOARD_COLLECTION_NAME).findOne({
        //     _id: new ObjectId(id)
        // })
        const result = await GET_DB().collection(BOARD_COLLECTION_NAME).aggregate([
            { 
                $match: {
                _id: new ObjectId(id),
                _destroy: false
                }
            },
            {
                $lookup: {
                    from: columnModel.COLUMN_COLLECTION_NAME,
                    localField: '_id',
                    foreignField: 'boardId',
                    as: 'columns'
                }

            },
            {
                $lookup: {
                    from: cardModel.CARD_COLLECTION_NAME,
                    localField: '_id',
                    foreignField: 'boardId',
                    as: 'cards'
                }
            }
        ]).toArray()
        console.log(result)
        return result[0] || {}
    } catch (error) {
        throw new Error(error)
    }
}

export const boardModel = {
    BOARD_COLLECTION_NAME,
    BOARD_COLLECTION_SCHEMA,
    createNew,
    findOneById,
    getDetails
}