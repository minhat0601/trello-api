import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import { EMAIL_RULE, EMAIL_RULE_MESSAGE } from '~/utils/validators'

const USER_ROLE = {
    CLIENT: 'client',
    ADMIN: 'admin'
}

const USER_COLLECTION_NAME = 'users'
const USER_COLLECTION_SCHEMA = Joi.object({
    email: Joi.string().required().pattern(EMAIL_RULE).message(EMAIL_RULE_MESSAGE),
    password: Joi.string().required(),
    username: Joi.string().required().trim().strict(),
    displayName: Joi.string().required().trim().strict(),
    avatar: Joi.string().default(null),
    role: Joi.string().valid(USER_ROLE.ADMIN, USER_ROLE.CLIENT).default(USER_ROLE.CLIENT),
    isActive: Joi.boolean().default(false),
    verifyToken: Joi.string(),
    createdAt: Joi.date().timestamp('javascript').default(Date.now),
    updatedAt: Joi.date().timestamp('javascript').default(null),
    _destroy: Joi.boolean().default(false)
})

const INVALID_UPDATE_FIELDS = ['_id', 'email', 'createdAt', 'username']

const validateBeforeData = async (data) => {
    return await USER_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}
const createNew = async (data) => {
    try {
        const validData = await validateBeforeData(data)
        const createdUser = await GET_DB().collection(USER_COLLECTION_NAME).insertOne(validData)
        return createdUser
    } catch (error) {
        throw new Error(error)
    }
}
const findOneById = async (userId) => {
    try {
        const result = await GET_DB().collection(USER_COLLECTION_NAME).findOne({ _id: new ObjectId(userId) })
        return result
    } catch (error) {
        throw new Error(error)
    }
}
const findOneByEmail = async (email) => {
    try {
        const result = await GET_DB().collection(USER_COLLECTION_NAME).findOne({ email: email})
        return result
    } catch (error) {
        throw new Error(error)
    }
}
const findOneByUsername = async (username) => {
    try {
        const result = await GET_DB().collection(USER_COLLECTION_NAME).findOne({ username: username})
        return result
    } catch (error) {
        throw new Error(error)
    }
}
const update = async (userId, data) =>{
    try {
        Object.keys(data).map(key => {
            if (INVALID_UPDATE_FIELDS.includes(key)) delete data[key]
        })
        const rs = await GET_DB().collection(USER_COLLECTION_NAME).findOneAndUpdate(
            { _id: new ObjectId(userId) },
            { $set: data },
            { returnDocument: 'after' }
        )
        return rs
    } catch (error) {
       throw new Error(error) 
    }
}
export const userModel = {
    createNew,
    findOneByEmail,
    findOneById,
    findOneByUsername,
    update,
    USER_COLLECTION_NAME,
    USER_COLLECTION_SCHEMA
}