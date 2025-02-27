
import { StatusCodes } from 'http-status-codes'
import { columnModel } from '~/models/columnModel'
import ApiError from '~/utils/ApiError'
import { cloneDeep, result } from 'lodash'
import { boardModel } from '~/models/boardModel'
import { GET_DB } from '~/config/mongodb'
import { cardModel } from '~/models/cardModel'
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
const deleteColumn = async (columnId) => {
    try {
        const column = await columnModel.findOneById(columnId)
        if (!column) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Column not found')
        }
        // Xoá column
        await columnModel.deleteOneById(columnId)
        // Xoá tất cả card trong column
        await cardModel.deleteManyByColumnId(columnId)
        // Sắp xếp lại OrderColumnId trong board
        await boardModel.pullColumnOrderIds(column)
        return { result:'success', message: 'Xoá cột thành công', column}
    } catch (error) {
        throw error
    }
}
export const columnService = {
    createNew,
    update,
    deleteColumn
}