
import { Injectable } from "@nestjs/common";
import nodemailer from "nodemailer";

@Injectable()
export default class AuthRepository {
constructor() {
}

async a(): Promise<any> {
    let transporter =await nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'thienphuc04072001@gmail.com', // generated ethereal user
          pass: 'bprhhmixzifkzozs', // generated ethereal password
        },
      });

      return transporter;
}


}