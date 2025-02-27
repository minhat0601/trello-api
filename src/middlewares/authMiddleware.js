import cookieParser from 'cookie-parser'
import { JwtProvider } from '~/providers/JwtProvider'
import { env } from '~/config/environment'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'

const isAuthorized = async (req, res, next) => {
    // Lấy access Token từ cookie ở request
    const clientAccessToken = req.cookies?.accessToken

    if (!clientAccessToken) {
        next (new ApiError(StatusCodes.UNAUTHORIZED, 'Chưa đăng nhập'))
        return
    }
    try {
        // parse token xem có hợp lệ 
        // Hợp lệ thì lưu thông tin decode vào req jwtDecode
        // next
        const tokenDecoded = await JwtProvider.verifyToken(
            clientAccessToken,
            env.ACCESS_TOKEN_SECRET_SIGNATURE
        )
        req.jwtDecoded = tokenDecoded
        next()
    } catch (error) {
        // Token hết hạn thì res về cho fe biết để gọi api refresh token
        if (error?.message?.includes('jwt expired')) {
            next(new ApiError(StatusCodes.GONE, 'Call refresh token'))
        } else {
            next(next (new ApiError(StatusCodes.UNAUTHORIZED, 'Unauthorized!')))
        }
    }
}
export const authMiddleware = {
    isAuthorized
}