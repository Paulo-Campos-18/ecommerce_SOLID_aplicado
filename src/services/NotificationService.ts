import { IMailProvider } from "../providers/IMailProvider";
import { OrderNotificationData } from '../dtos/OrdernotificationData'

export class NotificationService {
    private mailer: IMailProvider;
    constructor(mailer: IMailProvider) {
        this.mailer = mailer
    }

    async sendMail(orderData: OrderNotificationData): Promise<string> {

        const info = {
            from: '"DevStore" <noreply@devstore.com>',
            to: orderData.customer, 
            subject: `Confirmação do Pedido #${orderData.orderId}`,
            text: `Olá, seu pedido #${orderData.orderId} no valor de R$ ${orderData.totalAmount} foi confirmado.`,
            html: `
              <h1>Pedido Confirmado!</h1>
              <p>Olá, seu pedido <b>#${orderData.orderId}</b> foi processado com sucesso.</p>
              <p>Total: <strong>R$ ${orderData.totalAmount}</strong></p>
              <ul>
                ${orderData.items.map(p => `<li>${p.product.name}</li>`).join('')}
              </ul>
            `,
        };
        return await this.mailer.sendMail(info)
    }
}
