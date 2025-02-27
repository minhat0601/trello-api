import express from 'express'

import {userValidation} from '~/validations/userValidation'
import {userController} from '~/controllers/userController'


const Router = express.Router()

Router.route('/')
    .post(userValidation.createNew, userController.createNew)
Router.route('/verify-email')
    .put(userValidation.verifyEmail, userController.verifyEmail)
Router.route('/login')
    .post(userValidation.login, userController.login)
Router.route('/logout')
    .delete(userController.logout)
Router.route('/refresh-token')
    .get(userController.refreshToken)
export const userRoute = Router