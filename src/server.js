/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import express from 'express'
import {CONNECT_DB, GET_DB, CLOSE_DB} from '~/config/mongodb'
import exitHook from 'async-exit-hook'
import {env} from '~/config/environment'
const START_SERVER = () => {
  const app = express()

  // Route khi truy cap /
  app.get('/',async (req, res) => {
    // console.log(process.env)
    console.log(await GET_DB().listCollections().toArray())
    res.end('<h1>Hello World!</h1><hr>')
  })
  
  app.listen(env.APP_PORT, env.APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(`http://${ env.APP_HOST }:${ env.APP_PORT }/`)
  }) 
  
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