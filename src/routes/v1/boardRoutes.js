import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardValidation } from '~/validations/boardValidation'
import { boardController } from '~/controllers/boardController'
import { authMiddleware}  from '~/middlewares/authMiddleware'


const Router = express.Router()
Router.route('/')
    .get(authMiddleware.isAuthorized, (req, res) => {
        res.status(StatusCodes.OK).json({
            messages: 'API get list boards',
            code: StatusCodes.OK,
            method: req.method
        })
    })
    //Route tạo bảng mới, validation ngay ở route
    .post(authMiddleware.isAuthorized, boardValidation.createNew, boardController.createNew)

Router.route('/:id')
    .get(authMiddleware.isAuthorized, boardController.getDetails)
    .put(authMiddleware.isAuthorized, boardValidation.update, boardController.update)

// Route hỗ trợ di chuyển card giữa các column trong một board
Router.route('/supports/moving-card')
    .put(authMiddleware.isAuthorized, boardValidation.moveCardDifferentColumn, boardController.moveCardDifferentColumn)

export const boardRoute = Router