import { EmailContent } from "../dtos/emailContent";

export interface IMailProvider{
    sendMail(emailContent:EmailContent):Promise<string>
}