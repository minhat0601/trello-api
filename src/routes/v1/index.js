import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardRoute } from './boardRoutes'
import { columnRoute } from './columnRoutes'
import { cardRoute } from './cardRoutes'
import { userRoute } from './userRoutes'


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

// columns route
Router.use('/columns', columnRoute)

// cards route
Router.use('/cards', cardRoute)

// user route
Router.use('/users', userRoute)

export const APIs_V1 = Router