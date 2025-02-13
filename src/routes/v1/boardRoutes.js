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
    //Route tạo bảng mới
    .post(boardValidation.createNew, boardController.createNew)

export const boardRoute = Router