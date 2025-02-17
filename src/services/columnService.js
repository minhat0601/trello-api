
import { StatusCodes } from 'http-status-codes'
import { columnModel } from '~/models/columnModel'
import ApiError from '~/utils/ApiError'
import { cloneDeep } from 'lodash'
import { boardModel } from '~/models/boardModel'
const createNew = async (data) => {
    try {
        const newColumn = {
            ...data
        }

        const createdColumn = await columnModel.createNew(newColumn)
        const getnewColumn = await columnModel.findOneById(createdColumn.insertedId)

        if (getnewColumn){
            getnewColumn.cards = []

            await boardModel.pushColumnOrderIds(getnewColumn)
            return getnewColumn
        }
    } catch (error) {
        throw error
    }
}


export const columnService = {
    createNew
    
}