// const sgMail = require('@sendgrid/mail')

// class mailService {
//     constructor(to,name) {
//         sgMail.setApiKey(process.env.SENDGRID_API_KEY)
//         this.msg = {
//             to: to, 
//             from: process.env.EMAIL_NOTIFICATION, 
//             subject: 'Registration',
//             text: `Hello ${name}, you have successfully registered!!`,
//         }
//     }

//     async sendMail() {
//         sgMail
//             .send(this.msg)
//             .then(() => {
//                 return true
//             })
//             .catch((error) => {
//                 throw new Error(error)
//             })
//     }
// }

// module.exports = mailService;

const { Resend } = require('resend');
const resend = new Resend('re_SDycsMoE_A2WfAzULkbRjMQz2dSvTfbZq');

const resendEmail = async (to,firstname) => {
    try {
        const data = await resend.emails.send({
          from: 'Acme <soosaf22@gmail.com>',
        //   from: process.env.EMAIL_NOTIFICATION,
          to: ['soosaf22@gmail.com'],
          subject: 'Registration',
          html: `<strong>Hello ${firstname}, you have successfully registered!!</strong>`,
        });
    
        console.log(data);
      } catch (error) {
        console.error(error);
      }
};

module.exports = resendEmail;
