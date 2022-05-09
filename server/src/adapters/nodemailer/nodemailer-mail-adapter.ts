import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
   host: "smtp.mailtrap.io",
   port: 2525,
   auth: {
      user: "8be1a6658d0304",
      pass: "c46231e434e3f5"
   }
});

export class NodemailerMailAdapter implements MailAdapter {
   async sendMail({ subject, body }: SendMailData) {
      await transport.sendMail({
         from: 'Equipe Feedget <oi@Feedget.com>',
         to: 'Thierry Pitela Santos <ThierryPitela@hotmail.com>',
         subject,
         html: body,
      });
   }
}