const sgMail = require('@sendgrid/mail')

class mailService {
  constructor(to,firstname) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    this.msg = {
      to: to, 
      from: process.env.SENDGRID_FROM, 
      subject: 'Registration',
      text: `Hello ${firstname}, you have successfully registered!!`,
    }
  };

  async sendMail() {
    sgMail
    .send(this.msg)
    .then(() => { return true })
    .catch((error) => { throw new Error(error) })
  };
  
};

module.exports = mailService;
