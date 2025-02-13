/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
// YpojIXQcBcmUzpOy
import {MongoClient, ServerApiVersion} from 'mongodb'
import { env } from '~/config/environment'

// tao doi tuong instance, mac dinh chua ket noi la null
let trelloDBInstance = null
const mongoClientInstace = new MongoClient(env.MONGODB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
})
export const CONNECT_DB = async() => {
    // Goi ket noi toi mongo atlas voi RUI da khai bao
    await mongoClientInstace.connect()

    trelloDBInstance = mongoClientInstace.db(env.DB_NAME)
}

export const GET_DB = () => {
    if(!trelloDBInstance) throw new Error('Chua ket noi co so du lieu')
    return trelloDBInstance
}

export const CLOSE_DB = async () => {
    return await trelloDBInstance.close()
}