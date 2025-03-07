/**
 * Updated by trungquandev.com's author on Oct 8 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'

// Import pattern để check kiểu dữ liệu ObjectId Dành cho mongoDB
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'

// Define Collection (name & schema)
const CARD_COLLECTION_NAME = 'cards'
const CARD_COLLECTION_SCHEMA = Joi.object({
  boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  columnId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  title: Joi.string().required().min(3).max(50).trim().strict(),
  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})
// Cac field khong duoc update

const INVALID_UPDATE_FIELDS = ['_id', 'createdAt']

const validateBeforeCreate = async (data) => {
    return await CARD_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
    try {
        const validData = await validateBeforeCreate(data)
        const createdCard = await GET_DB().collection(CARD_COLLECTION_NAME).insertOne({
            ...validData,
            boardId: new ObjectId(validData.boardId),
            columnId: new ObjectId(validData.columnId)
        })
        return createdCard
    } catch (error) {
        throw new Error(error)
    }
}

const findOneById = async (id) => {
    try {
        // console.log(id)

        const result = await GET_DB().collection(CARD_COLLECTION_NAME).findOne({
            _id: new ObjectId(id)
        })
        return result
    } catch (error) {
        throw new Error(error)
    }
}


const update = async (cardId, data) => {
    try {
        Object.keys(data).map(key => {
            if (INVALID_UPDATE_FIELDS.includes(key)) {
                delete data[key]
            }
        })
        // Convert columnId to ObjectId
        if (data.columnId) {
            data.columnId = new ObjectId(data.columnId)
        }
        const rs = await GET_DB().collection(CARD_COLLECTION_NAME).findOneAndUpdate(
            { _id: new ObjectId(cardId) },
            { $set: data},
            { returnDocument: 'after' }
        )
    } catch (error) {
        throw new Error(error)
    }
}

const deleteManyByColumnId = async (columnId) => {
    try {
        return (await GET_DB().collection(CARD_COLLECTION_NAME).deleteMany({ columnId: new ObjectId(columnId) }))

    } catch (error) {
        throw new Error(error)
    }
}
export const cardModel = {
  CARD_COLLECTION_NAME,
  CARD_COLLECTION_SCHEMA,
  createNew,
  findOneById,
  deleteManyByColumnId,
  update
}