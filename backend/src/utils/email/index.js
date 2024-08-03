const nodemailer = require('nodemailer');
const mustache = require('mustache');
const fs = require('fs');
require('dotenv').config();

const sendMail = (data) => {
  new Promise((resolve, reject) => {
    const { to, subject, template } = data;

    const fileTemplate = fs.readFileSync(
      `src/utils/email/templates/${template}`,
      'utf8'
    );

    // const accessToken = OAuth2_client.getAccessToken;

    const transporter = nodemailer.createTransport({
      service: process.env.SMTP_SERVICE,
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"${process.env.SMTP_EMAIL}" <${process.env.SMTP_EMAIL}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      html: mustache.render(fileTemplate, { ...data }),
    };
    transporter.sendMail(mailOptions, async (error, info) => {
      console.log('[+] BERHASIL MENGIRIM EMAIL [+]');
      if (error) {
        reject(error);
      } else {
        resolve(info.response);
      }
    });
  });
};
module.exports = sendMail;
