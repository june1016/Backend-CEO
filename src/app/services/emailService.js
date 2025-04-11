import nodemailer from 'nodemailer';
import { envs } from '../../config/index.js';

const sendResetEmail = async (email, resetLink) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: envs.EMAIL_USER,
      pass: envs.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: envs.EMAIL_USER,
    to: email,
    subject: 'Password Reset Request',
    text: `Click the link to reset your password: ${resetLink}`,
    html: `<p>Click the link to reset your password: <a href="${resetLink}">${resetLink}</a></p>`,
  };

  await transporter.sendMail(mailOptions);
};

export default sendResetEmail;