export interface IMailProvider{
    sendMail():Promise<void>
}