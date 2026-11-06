const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail', 
    auth: {
      user: 'muskanpashine04@gmail.com', 
      pass: 'perz zexo zmzb imgv', 
    },
  });

  const mailOptions = {
    from: 'muskanpashine04@gmail.com',
    to,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };