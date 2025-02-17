
import { StatusCodes } from 'http-status-codes'
import { columnService } from '~/services/columnService'
const createNew = async (req, res, next) => {
    try {

        const createdColumn = await new columnService.createNew(req.body)
        res.status(StatusCodes.CREATED).json(createdColumn)
    } catch (error) {
        next(error)
    }

}

const getDetails = async (req, res, next) => {
    try {
        const id = req.params.id
        const column = await columnService.getDetails(id)

        res.status(StatusCodes.CREATED).json(column)
    } catch (e) {
        next(e)
    }
}
export const columnController = {
    createNew,
    getDetails
}