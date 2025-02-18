
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

const update = async (req, res, next) => {
    try {
        const columnId = req.params.id
        const data = req.body
        console.log(req.body)
        const updated = await new columnService.update(columnId, data)
        res.status(StatusCodes.CREATED).json(updated)
    } catch (error) {
        next(error)
    }

}
export const columnController = {
    createNew,
    getDetails,
    update
}