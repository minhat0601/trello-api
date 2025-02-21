import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardValidation } from '~/validations/boardValidation'
import { boardController } from '~/controllers/boardController'


const Router = express.Router()
Router.route('/')
    .get((req, res) => {
        res.status(StatusCodes.OK).json({
            messages: 'API get list boards',
            code: StatusCodes.OK,
            method: req.method
        })
    })
    //Route tạo bảng mới, validation ngay ở route
    .post(boardValidation.createNew, boardController.createNew)

Router.route('/:id')
    .get(boardController.getDetails)
    .put(boardValidation.update, boardController.update)

// Route hỗ trợ di chuyển card giữa các column trong một board
Router.route('/supports/moving-card')
    .put(boardValidation.moveCardDifferentColumn, boardController.moveCardDifferentColumn)

export const boardRoute = Router