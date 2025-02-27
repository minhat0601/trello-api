import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { cardValidation } from '~/validations/cardValidation'
import { cardController } from '~/controllers/cardController'
import { authMiddleware}  from '~/middlewares/authMiddleware'


const Router = express.Router()
Router.route('/')
    .get(authMiddleware.isAuthorized, (req, res) => {
        res.status(StatusCodes.OK).json({
            messages: 'API get list cards',
            code: StatusCodes.OK,
            method: req.method
        })
    })
    //Route tạo bảng mới, validation ngay ở route
    .post(authMiddleware.isAuthorized, cardValidation.createNew, cardController.createNew)

Router.route('/:id')
    .get(authMiddleware.isAuthorized, cardController.getDetails)

export const cardRoute = Router