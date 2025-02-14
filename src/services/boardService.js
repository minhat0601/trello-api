/* eslint-disable no-useless-catch */
/* eslint-disable no-console */
/* eslint-disable no-empty */
/* eslint-disable no-trailing-spaces */
/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { StatusCodes } from "http-status-codes";
import { slugify } from "~/utils/fomatter";

const createNew = async (data) => {
    try {
        const newBoard = {
            ...data,
            slug: slugify(data.title)
        }        

        console.log(newBoard)
        return newBoard 
    } catch (error) {
        throw error
    }
}

export const boardService = {
    createNew
}