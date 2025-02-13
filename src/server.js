/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import express from 'express'
import {CONNECT_DB, GET_DB, CLOSE_DB} from '~/config/mongodb'
import exitHook from 'async-exit-hook'
import {env} from '~/config/environment'
import { APIs_V1 } from './routes/v1/'
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware'
const START_SERVER = () => {
  const app = express()

  // enable req.body data
  app.use(express.json())

  app.use('/v1', APIs_V1)

  // Xử lý lỗi tập trung (Middleware)
  app.use(errorHandlingMiddleware)

  app.get('/',async (req, res) => {
    // console.log(process.env)
    console.log(await GET_DB().listCollections().toArray())
    res.end('<h1>Hello World!</h1><hr>')
  })
  
  app.listen(env.APP_PORT, env.APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(`http://${ env.APP_HOST }:${ env.APP_PORT }/`)
  }) 
  // disconnect DB & exit
  exitHook(() => {
    console.log('DB disconnected ')
    CLOSE_DB
  });
}

(async () => {
  try {
    console.log('Dang ket noi...')
    await CONNECT_DB()
    START_SERVER()
  } catch (error) {
    console.error(error)
  }
})()



// CONNECT_DB()
//   .then(() => console.log('Ket noi thanh cong'))
//   .then(() => START_SERVER())
//   .catch(error => {
//     console.log(error)
//     process.exit(0)
//   })