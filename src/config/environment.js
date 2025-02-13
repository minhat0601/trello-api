/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import 'dotenv/config'

export const env = {
    APP_HOST: process.env.APP_HOST,
    APP_PORT: process.env.APP_PORT,

    DB_NAME: process.env.DB_NAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_USERNAME: process.env.DB_USERNAME,
    MONGODB_URI: process.env.MONGODB_URI
}