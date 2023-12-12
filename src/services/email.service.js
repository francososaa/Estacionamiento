const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendRegistrationEmail = async (email, firstname) => {
  try {
    if ( !email || !firstname ) throw new Error("Can not send an email without data");

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Registration",
      text: `Hello ${firstname}, you have successfully registered!!`,
    })
    return info
  } catch (error) {
    throw error
  }
}

module.exports = { sendRegistrationEmail };
