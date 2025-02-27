import { StatusCodes } from 'http-status-codes'
import { userModel } from '~/models/userModel'
import bcrypt from 'bcrypt' // Sửa lại cách import
import ApiError from '~/utils/ApiError'
import { v4 as uuidv4 } from 'uuid'
import { pick } from 'lodash'
import { pickUser } from '~/utils/fomatter'
import { WESITE_DOMAIN } from '~/utils/constants'
import { BrevoProvider } from '~/providers/BrevoProvider'
import { env } from '~/config/environment'
import { JwtProvider } from '~/providers/JwtProvider'

const createNew = async (reqBody) => {
    try {
        const data = reqBody
        const exitEmail = await exitUserByEmail(data.email)

        if (exitEmail) throw new ApiError(StatusCodes.CONFLICT, 'Email đã tồn tại trên hệ thống.')
        const nameFromEmail = data.email.split('@')[0]
        const newUser = {
            email: data.email,
            username: nameFromEmail,
            displayName: data.displayName,
            password: bcrypt.hashSync(data.password, 10),
            verifyToken: uuidv4()
        }
        const rs = await userModel.createNew(newUser)
        const userInserted = await userModel.findOneById(rs.insertedId)

        //Email send
        const verifyLink = `${WESITE_DOMAIN}/account-verificate?email=${userInserted.email}&token=${userInserted.verifyToken}`
        const customSubject = `Chỉ một bước nữa là ${userInserted.displayName} đã có thể sử dụng Trello...`
        const htmlContent = `
        Xin chào <b>${userInserted.displayName}<b>,</br>
        Vui lòng xác nhận email của bạn để tiếp tục sử dụng Trello<br>
        Liên kết xác nhận của bạn: <a href='${verifyLink}'> Bấm vào đây</a><br>
        Nếu bạn không biết tại sao nhận được email này, xin vui lòng bỏ qua.`
        const sentEmail = await BrevoProvider.sendEmail(userInserted.email, htmlContent, customSubject)
        // return {
        //     user: userInserted,
        //     rs: rs,
        //     verifyLink: verifyLink
        // }
        return pickUser(userInserted)
    } catch (error) {
        throw error
    }
}

const exitUserByEmail = async(email) => {
    const rs = await userModel.findOneByEmail(email)
    return rs
}
const exitUserByUsername = async(username) => {
    const rs = await userModel.findOneByUsername(username)
    return rs
}
const verifyEmail = async(verifyToken, email) => {
    try {
        const userExit = await exitUserByEmail(email)
        if (!userExit || userExit.isActive === true) throw new Error('Xác thực không hợp lệ')
        if (userExit.verifyToken !== verifyToken) {
             throw new Error('Xác thực không hợp lệ')
        }
        const userId = userExit._id
        const rs = await userModel.update(userId, {isActive: true, updatedAt: Date.now() })
        return {
            success: true,
            message: 'Xác thực thành công'
        }
    } catch (error) {
        throw new Error(error)
    }
}
const login = async (email, password) => {
    try {
        const exitsUser = await exitUserByEmail(email)
        // return exitsUser
        if (!exitsUser) throw new ApiError(StatusCodes.NOT_FOUND, 'Không tìm thấy tài khoản cho email này.')
        if (exitsUser.isActive === false) throw new ApiError(StatusCodes.NOT_ACCEPTABLE, 'Tài khoản chưa xác thực. Vui lòng xác thực tài khoản để tiếp tục sử dụng.')
        if (bcrypt.compareSync(toString(password), exitsUser.password)) {
            throw new ApiError(StatusCodes.NOT_ACCEPTABLE, 'Tài khoản hoặc mật khẩu không đúng, vui lòng kiểm tra lại.')
        }
        // Tạo Token
        const userInfo = {
            _id: exitsUser._id,
            email: exitsUser.email,
            role: exitsUser.role
        }
        const accessToken = await JwtProvider.generateToken(
            userInfo,
            env.ACCESS_TOKEN_SECRET_SIGNATURE,
            env.ACCESS_TOKEN_LIFE
        )
        const refreshToken = await JwtProvider.generateToken(
            userInfo,
            env.REFRESH_TOKEN_SECRET_SIGNATURE,
            env.REFRESH_TOKEN_LIFE
        )
        return { accessToken, refreshToken, ...pickUser(exitsUser) }
    } catch (error) {
        throw new Error(error)
    }
}
const refreshToken = async (refreshToken) => {
    try {
        console.log(refreshToken)
        const refreshTokenDecoded = await JwtProvider.verifyToken(
            refreshToken,
            env.REFRESH_TOKEN_SECRET_SIGNATURE
        )
        const userInfo = {
            _id: refreshTokenDecoded._id,
            email: refreshTokenDecoded.email,
            role: refreshTokenDecoded.role
        }
        const accessToken = await JwtProvider.generateToken(
            userInfo,
            env.ACCESS_TOKEN_SECRET_SIGNATURE,
            env.ACCESS_TOKEN_LIFE
        )
        return { accessToken }
    } catch (error) {
        throw new Error(error)
    }
}
export const userService = {
    createNew,
    exitUserByUsername,
    exitUserByEmail,
    verifyEmail,
    login,
    refreshToken

}