const sgMail = require('@sendgrid/mail')

class mailService {
    constructor(to,name) {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        this.msg = {
            to: to, 
            from: process.env.EMAIL_NOTIFICATION, 
            subject: 'Registration',
            text: `Hello ${name}, you have successfully registered!!`,
        }
    }

    async sendMail() {
        sgMail
            .send(this.msg)
            .then(() => {
                return true
            })
            .catch((error) => {
                throw new Error(error)
            })
    }
}

module.exports = mailService;