import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { columnValidation } from '~/validations/columnValidation'
import { columnController } from '~/controllers/columnController'


const Router = express.Router()
Router.route('/')
    .get((req, res) => {
        res.status(StatusCodes.OK).json({
            messages: 'API get list columns',
            code: StatusCodes.OK,
            method: req.method
        })
    })
    //Route tạo bảng mới, validation ngay ở route
    .post(columnValidation.createNew, columnController.createNew)

Router.route('/:id')
    .get(columnController.getDetails)
    .put(columnValidation.update, columnController.update)

export const columnRoute = Router