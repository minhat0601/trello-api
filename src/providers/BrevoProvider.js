const SibApiV3Sdk = require('@getbrevo/brevo')
import { env } from '~/config/environment'

let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi()
let apiKey = apiInstance.authentications['apiKey']
apiKey.apiKey = env.BREVO_API_KEY


const sendEmail = async (recipientEmail, content, subject) => {
    let sendSMTPEmail = new SibApiV3Sdk.SendSmtpEmail()

    sendSMTPEmail.sender = {
        email: env.ADMIN_EMAIL_ADDRESS,
        name: env.ADMIN_EMAIL_NAME
    }
    sendSMTPEmail.to = [{ email: recipientEmail }]
    sendSMTPEmail.subject = subject


    sendSMTPEmail.htmlContent = content

    // Gui
    console.log

    return apiInstance.sendTransacEmail(sendSMTPEmail)
}

export const BrevoProvider = {
    sendEmail
}