
import { StatusCodes } from 'http-status-codes'
import { cardService } from '~/services/cardService'
const createNew = async (req, res, next) => {
    try {

        const createdCard = await new cardService.createNew(req.body)
        res.status(StatusCodes.CREATED).json(createdCard)
    } catch (error) {
        next(error)
    }

}

const getDetails = async (req, res, next) => {
    try {
        const id = req.params.id
        const card = await cardService.getDetails(id)

        res.status(StatusCodes.CREATED).json(card)
    } catch (e) {
        next(e)
    }
}
export const cardController = {
    createNew,
    getDetails
}