import nodemailer from 'nodemailer';
import { LoggerProvider } from '../providers/LoggerProvider';
import { IMailProvider } from './IMailProvider';
import { EmailContent } from '../dtos/emailContent';

let transporter: nodemailer.Transporter | null = null;
const logger = LoggerProvider.getLogger();

export class EtheralMailProvider implements IMailProvider {

  private async getMailClient() {
    if (transporter) return transporter;

    // Cria uma conta de teste no Ethereal automaticamente
    const testAccount = await nodemailer.createTestAccount();

    transporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    logger.info(`Ethereal Mail configurado: ${testAccount.user}`);
    return transporter;
  }

  async sendMail(emailContent: EmailContent): Promise<string> {
    const mailer = await this.getMailClient();
    const info = await mailer.sendMail(emailContent)

    // use este link para visualizar no Ethereal
    const url = nodemailer.getTestMessageUrl(info);
    
    if (url) {
      logger.info(`Email enviado: ${url}`);
      return url;
    }else{
      logger.info("Email enviado mas url de pré-visualização indisponível");
      return "Indisponível";
    }
  }
}

