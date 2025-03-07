/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { StatusCodes } from 'http-status-codes'
import { boardModel } from '~/models/boardModel'
import { boardService } from '~/services/boardService'
const createNew = async (req, res, next) => {
    try {
        // console.log('req body', req.body)
        // console.log('req query', req.query)
        // console.log('req params', req.params)
        // console.log('req files', req.files)
        // console.log('req cookies', req.cookies)
        // console.log('req jwtDecoded', req.jwtDecoded)

        // next to service
        const createdBoard = await new boardService.createNew(req.body)
        // Response
        res.status(StatusCodes.CREATED).json(createdBoard)
    } catch (error) {
        next(error)
    }

}
const update = async (req, res, next) => {
    try {
        const boardId = req.params.id
        const data = req.body   
        const updatedBoard = await boardService.update(boardId, data)
        res.status(StatusCodes.OK).json(updatedBoard)
    } catch (error) {
        next(error)
    }

}

const getDetails = async (req, res, next) => {
    try {
        const id = req.params.id
        const board = await boardService.getDetails(id)

        res.status(StatusCodes.CREATED).json(board)
    } catch (e) {
        next(e)
    }
}

const moveCardDifferentColumn = async (req, res, next) =>{
    try {
        const rs = await boardService.moveCardDifferentColumn(req.body)
        res.status(StatusCodes.OK).json(rs)
    } catch (error) {
        next(error)
    }
}
export const boardController = {
    createNew,
    getDetails,
    moveCardDifferentColumn,
    update
}