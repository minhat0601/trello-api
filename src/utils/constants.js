import { env } from '~/config/environment'

export const WHITELIST_DOMAINS = [
    // 'http://localhost:5173',
    'https://trello-fe-gamma.vercel.app'
]
export const BOARD_TYPES = {
    PUBLIC: 'public',
    PRIVATE: 'private'
}
export const WESITE_DOMAIN = (env.BUILD_MODE === 'production') ? env.WEBSITE_DOMAIN_PRODUCTION : env.WEBSITE_DOMAIN_DEVELOPMENT