import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { columnValidation } from '~/validations/columnValidation'
import { columnController } from '~/controllers/columnController'
import { authMiddleware}  from '~/middlewares/authMiddleware'


const Router = express.Router()
Router.route('/')
    .get(authMiddleware.isAuthorized, (req, res) => {
        res.status(StatusCodes.OK).json({
            messages: 'API get list columns',
            code: StatusCodes.OK,
            method: req.method
        })
    })
    //Route tạo bảng mới, validation ngay ở route
    .post(authMiddleware.isAuthorized, columnValidation.createNew, columnController.createNew)

Router.route('/:id')
    .get(authMiddleware.isAuthorized, columnController.getDetails)
    .put(authMiddleware.isAuthorized,columnValidation.update, columnController.update)
    .delete(authMiddleware.isAuthorized,columnValidation.deleteColumn, columnController.deleteColumn)


export const columnRoute = Router