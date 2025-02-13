/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiError";
const createNew = async (req, res, next) => {
    try {
        // console.log('req body', req.body)
        // console.log('req query', req.query)
        // console.log('req params', req.params)
        // console.log('req files', req.files)
        // console.log('req cookies', req.cookies)
        // console.log('req jwtDecoded', req.jwtDecoded)

        // next to service
        // Response
        res.status(StatusCodes.CREATED).json({
            messages: 'Created Success',
            code: StatusCodes.CREATED,
            method: req.method
        })
    } catch (error) {
        next(error)
    }

}
export const boardController = {
    createNew
}