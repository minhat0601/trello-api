
import { cardModel } from '~/models/cardModel'
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