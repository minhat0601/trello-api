import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { cardValidation } from '~/validations/cardValidation'
import { cardController } from '~/controllers/cardController'


const Router = express.Router()
Router.route('/')
    .get((req, res) => {
        res.status(StatusCodes.OK).json({
            messages: 'API get list cards',
            code: StatusCodes.OK,
            method: req.method
        })
    })
    //Route tạo bảng mới, validation ngay ở route
    .post(cardValidation.createNew, cardController.createNew)

Router.route('/:id')
    .get(cardController.getDetails)

export const cardRoute = Router