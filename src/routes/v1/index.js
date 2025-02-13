import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardRoute } from './boardRoutes'


const Router = express.Router()

// APIs check
Router.get('/', (req, res) => {
    res.status(StatusCodes.OK).json({
        messages: 'APIs V1',
        code: StatusCodes.OK
    })
})
// Import board APIs
Router.use('/boards', boardRoute)


export const APIs_V1 = Router