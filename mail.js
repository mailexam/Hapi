const nodemailer = require('nodemailer');

function createTransport() {
  const login = process.env.MAILEXAM_LOGIN;
  const port = Number(process.env.MAILEXAM_PORT || 587);

  return nodemailer.createTransport({
    host: `${login}.mailexam.ru`,
    port,
    secure: port === 465,
    auth: {
      user: login,
      pass: process.env.MAILEXAM_PASSWORD,
    },
  });
}

async function sendTest({ to, subject, text }) {
  const transport = createTransport();

  await transport.sendMail({
    from: process.env.MAIL_FROM || 'noreply@example.test',
    to: to || 'user@example.test',
    subject: subject || 'Hapi + Mailexam',
    text: text || 'Mailexam test from Hapi',
  });
}

module.exports = { sendTest };
