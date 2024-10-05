// See the mail messages at https://ethereal.email/messages
require("dotenv").config();
var nodemailer = require('nodemailer');

const sendRestePasswordEmail = (email, resetPasswordToken) => {

  const transporter = nodemailer.createTransport({
      host: process.env.MAIL_SMTP_HOST,
      port: process.env.MAIL_SMTP_PORT,
      auth: {
          user: process.env.MAIL_SMTP_USER,
          pass: process.env.MAIL_SMTP_PASS
      }
  });

  var mailOptions = {
    from: process.env.MAIL_SMTP_FROM,
    to: email,
    subject: "AirPick: Reset Your Password",
    text: `You are receiving this email because you (or someone else) have
      requested to reset your password. 
      Please click the following link to complete the process within 15 minutes:

        ${process.env.FRONTEND_BASE_URL}/reset_password/${resetPasswordToken}

      if you did not request this, please ignore this email and your password
      will remain unchanged.`
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

module.exports = { sendRestePasswordEmail };
