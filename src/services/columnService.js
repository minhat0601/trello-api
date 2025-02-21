
import { StatusCodes } from 'http-status-codes'
import { columnModel } from '~/models/columnModel'
import ApiError from '~/utils/ApiError'
import { cloneDeep } from 'lodash'
import { boardModel } from '~/models/boardModel'
import { GET_DB } from '~/config/mongodb'
const createNew = async (data) => {
    try {
        const newColumn = {
            ...data
        }

        const createdColumn = await columnModel.createNew(newColumn)
        const getnewColumn = await columnModel.findOneById(createdColumn.insertedId)

        if (getnewColumn) {
            getnewColumn.cards = []
            await boardModel.pushColumnOrderIds(getnewColumn)
            return getnewColumn
        }
    } catch (error) {
        throw error
    }
}

const update = async (columnId, data) => {
    try {
        const newColumn = {
            ...data,
            updatedAt: Date.now()
        }

        return await columnModel.update(columnId, newColumn)
    } catch (error) {
        throw error
    }
}

export const columnService = {
    createNew,
    update
}