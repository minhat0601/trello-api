/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { StatusCodes } from 'http-status-codes'
import { result } from 'lodash'
import { userModel } from '~/models/userModel'
import { userService } from '~/services/userService'
import ApiError from '~/utils/ApiError'
import ms from 'ms'
import { pickUser } from '~/utils/fomatter'
const createNew = async (req, res, next) => {
    try {
        // console.log('req body', req.body)
        // console.log('req query', req.query)
        // console.log('req params', req.params)
        // console.log('req files', req.files)
        // console.log('req cookies', req.cookies)
        // console.log('req jwtDecoded', req.jwtDecoded)

        // next to service
        const createdUser = await new userService.createNew(req.body)
        // Response
        res.status(StatusCodes.CREATED).json(createdUser)

    } catch (error) {
        next(error)
    }

}
const update = async (req, res, next) => {
    try {
        const userId = req.params.id
        const data = req.body
        const updatedUser = await userService.update(userId, data)
        res.status(StatusCodes.OK).json(updatedUser)
    } catch (error) {
        next(error)
    }

}

const getDetails = async (req, res, next) => {
    try {
        const id = req.params.id
        const user = await userModel.findOneById(id)

        res.status(StatusCodes.CREATED).json(user)
    } catch (e) {
        next(e)
    }
}

const verifyEmail = async (req, res, next) => {
    try {
        const verifyToken = req.body.token
        const email = req.body.email
        const updatedUser = await userService.verifyEmail(verifyToken, email)
        res.status(StatusCodes.OK).json(updatedUser)
    } catch (error) {
        next(error)
    }

}
const login = async (req, res, next) => {
    try {
        const email = req.body.email
        const password = req.body.password
        const user = await userService.login(email, password)
        // Gán cookie cho trình duyêt
        res.cookie('accessToken', user.accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: ms('14 days')
        })
        res.cookie('refreshToken', user.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: ms('14 days')
        })
        res.status(StatusCodes.OK).json(user)
    } catch (error) {
        next(error)
    }
}
const logout = async (req, res, next) => {
    try {
        res.clearCookie('accessToken')
        res.clearCookie('refreshToken')
        res.status(StatusCodes.OK).json({loggedOut: true})
    } catch (error) {
        next(error)
    }
}
const refreshToken = async (req, res, next) => {
    try {
        // console.log(req.cookies?.refreshToken)
        const result = await userService.refreshToken(req.cookies?.refreshToken)
        res.cookie('accessToken', result.accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: ms('14 days')
        })
        // if (!result || result === null || result === undefined) throw ApiError(StatusCodes.UNAUTHORIZED, 'Vui lòng đăng nhập lại')
        // if (!result) throw ApiError(StatusCodes.UNAUTHORIZED, 'Vui lòng đăng nhập lại')
        res.status(StatusCodes.OK).json(result.accessToken)
        // next()
    } catch (error) {
        next(next (new ApiError(StatusCodes.UNAUTHORIZED, 'Vui lòng đăng nhập lại')))
    }
}
export const userController = {
    createNew,
    getDetails,
    verifyEmail,
    login,
    logout,
    refreshToken
}