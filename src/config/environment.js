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
    MONGODB_URI: process.env.MONGODB_URI,
    BUILD_MODE: process.env.BUILD_MODE,
    WEBSITE_DOMAIN_PRODUCTION: process.env.WEBSITE_DOMAIN_PRODUCTION,
    WEBSITE_DOMAIN_DEVELOPMENT: process.env.WEBSITE_DOMAIN_DEVELOPMENT,
    BREVO_API_KEY: process.env.BREVO_API_KEY,
    ADMIN_EMAIL_NAME: process.env.ADMIN_EMAIL_NAME,
    ADMIN_EMAIL_ADDRESS: process.env.ADMIN_EMAIL_ADDRESS,

    ACCESS_TOKEN_SECRET_SIGNATURE: process.env.ACCESS_TOKEN_SECRET_SIGNATURE,
    ACCESS_TOKEN_LIFE: process.env.ACCESS_TOKEN_LIFE,
    REFRESH_TOKEN_SECRET_SIGNATURE: process.env.REFRESH_TOKEN_SECRET_SIGNATURE,
    REFRESH_TOKEN_LIFE: process.env.REFRESH_TOKEN_LIFE
}