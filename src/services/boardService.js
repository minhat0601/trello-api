import { StatusCodes } from 'http-status-codes'
import { slugify } from '~/utils/fomatter'
import { boardModel } from '~/models/boardModel'
import ApiError from '~/utils/ApiError'
import { cloneDeep } from 'lodash'
import { columnModel } from '~/models/columnModel'
import { cardModel } from '~/models/cardModel'
import { ObjectId } from 'mongodb'
const createNew = async (data) => {
    try {
        const newBoard = {
            ...data,
            slug: slugify(data.title)
        }

        const createdBoard = await boardModel.createNew(newBoard)
        return await boardModel.findOneById(createdBoard.insertedId)
    } catch (error) {
        throw error
    }
}

const getDetails = async (boardId) => {
    try {
        const result = await boardModel.getDetails(boardId)
        if (!result) throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found')
        const resBoard = cloneDeep(result)
        // đưa về fomart {board: {columns{cards}}}
        resBoard.columns.forEach((column) => {
            column.cards = resBoard.cards.filter((card) => card.columnId.toString() === column._id.toString())
        })
        // Xoa mang cards khoi result ban dau
        delete resBoard.cards
        return resBoard
    } catch (error) {
        throw (error)
    }
}

const update = async (boarId, data) => {
    try {
        const updateData = {
            ...data,
            updatedAt: Date.now()
        }
        return await boardModel.update( boarId, updateData)
    } catch (error) {
        throw error
    }
}

const moveCardDifferentColumn = async (reqBody) => {
    try {
        await columnModel.update(reqBody.prevColumnId, {
            cardOrderIds: reqBody.prevCardOrderIds,
            updateAt: Date.now()
        })
        await columnModel.update(reqBody.nextColumnId, {
            cardOrderIds: reqBody.nextCardOrderIds,
            updateAt: Date.now()
        })
        await cardModel.update(reqBody.currentCardId, {
            columnId: reqBody.nextColumnId,
            updateAt: Date.now()
        })
        return {
            updateResult: 'successfully'
        }
    } catch (error) {
        throw error
    }
}
export const boardService = {
    createNew,
    getDetails,
    moveCardDifferentColumn,
    update
}