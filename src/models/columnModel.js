/**
 * Updated by trungquandev.com's author on Oct 8 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import Joi from 'joi'
// Import pattern để check kiểu dữ liệu ObjectId Dành cho mongoDB
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'
import { GET_DB } from '~/config/mongodb'
import { ObjectId, ReturnDocument } from 'mongodb'
import { boardModel } from './boardModel'

const INVALID_UPDATE_FIELDS =['_id', 'createdAt', 'boardId']
// Define Collection (name & schema)
const COLUMN_COLLECTION_NAME = 'columns'
const COLUMN_COLLECTION_SCHEMA = Joi.object({
  boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  title: Joi.string().required().min(3).max(50).trim().strict(),

  // Lưu ý các item trong mảng cardOrderIds là ObjectId nên cần thêm pattern cho chuẩn nhé, (lúc quay video số 57 mình quên nhưng sang đầu video số 58 sẽ có nhắc lại về cái này.)
  cardOrderIds: Joi.array().items(
    Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
  ).default([]),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})
// Cac truong ko duoc update
const validateBeforeCreate = async (data) => {
    return await COLUMN_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
    try {
        const validData = await validateBeforeCreate(data)
        const createdColumn = await GET_DB().collection(COLUMN_COLLECTION_NAME).insertOne({
            ...validData,
            boardId: new ObjectId(validData.boardId)
        })
        return createdColumn
    } catch (error) {
        throw new Error(error)
    }
}

const findOneById = async (id) => {
    try {
        // console.log(id)

        const result = await GET_DB().collection(COLUMN_COLLECTION_NAME).findOne({
            _id: new ObjectId(id)
        })
        return result
    } catch (error) {
        throw new Error(error)
    }
}
const pushCardOrderIds = async (card) => {
    try {
        const rs = await GET_DB().collection(COLUMN_COLLECTION_NAME).findOneAndUpdate(
            { _id: new ObjectId(card.columnId) },
            { $push: { cardOrderIds: new Object(card._id) } },
            { ReturnDocument: 'after' }
        )
        console.log(card)
        return rs
    } catch (e) {
        throw new Error(e)
    }
}

const update = async (columnId, data) => {
    try {
        Object.keys(data).map(key => {
            if (INVALID_UPDATE_FIELDS.includes(key)) {
                delete data[key]
            }
        })
        if (data.cardOrderIds) {
            data.cardOrderIds = data.cardOrderIds.map((id) => new ObjectId(id))
        }
        const rs = await GET_DB().collection(COLUMN_COLLECTION_NAME).findOneAndUpdate(
            {_id: new ObjectId(columnId)},
            {$set: data},
            {returnDocument: 'after'}
        )
        return rs
    } catch (error) {
        throw new Error(error)
    }
}

const deleteOneById = async (columnId) => {
    try {
        const rs = await GET_DB().collection(COLUMN_COLLECTION_NAME).deleteOne(
            {_id: new ObjectId(columnId)}
        )
        return rs
    } catch (error) {
        throw new Error(error)
    }
}
export const columnModel = {
  COLUMN_COLLECTION_NAME,
  COLUMN_COLLECTION_SCHEMA,
  createNew,
  findOneById,
  pushCardOrderIds,
  update,
  deleteOneById
}