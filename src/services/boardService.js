import { StatusCodes } from "http-status-codes";
import { slugify } from "~/utils/fomatter";
import { boardModel } from "~/models/boardModel";
import ApiError from "~/utils/ApiError";
import { clone, cloneDeep } from 'lodash'
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

export const boardService = {
    createNew,
    getDetails
}