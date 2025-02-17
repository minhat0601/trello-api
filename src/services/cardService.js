
import { StatusCodes } from 'http-status-codes'
import { slugify } from '~/utils/fomatter'
import { cardModel } from '~/models/cardModel'
import ApiError from '~/utils/ApiError'
import { cloneDeep } from 'lodash'
import { columnModel } from '~/models/columnModel'
const createNew = async (data) => {
    try {
        const newCard = {
            ...data
        }

        const createdCard = await cardModel.createNew(newCard)
        const getNewCard = await cardModel.findOneById(createdCard.insertedId)
        await columnModel.pushCardOrderIds(getNewCard)
        return getNewCard
    } catch (error) {
        throw error
    }
}


export const cardService = {
    createNew
    
}