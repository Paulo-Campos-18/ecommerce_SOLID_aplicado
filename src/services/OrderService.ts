import { ProcessOrderInput } from '../dtos/ProcessOrderInput';
import { ProductDetail } from '../dtos/ProductDetail';
import { LoggerProvider } from '../providers/LoggerProvider';
import { IOrderRepository } from '../repositories/IOrderRepository';
import { PaymentFactory } from '../payments/PaymentFactory'
import { OrderBd } from '../dtos/OrderBd';
import { NotificationService } from './NotificationService';
import { OrderNotificationData } from '../dtos/OrdernotificationData'

export class orderService {
    private bd: IOrderRepository
    private logger = LoggerProvider.getLogger();
    private notificationService: NotificationService

    constructor(bd: IOrderRepository, notificationService: NotificationService) {
        this.bd = bd;
        this.notificationService = notificationService;
    }

    async order(input: ProcessOrderInput):Promise<{ orderId: number; emailPreview: string; }> {

        // 1. VALIDAÇÃO
        if (!input.items || input.items.length === 0) {
            this.logger.error('Tentativa de pedido sem itens');
            throw new Error(`Carrinho vazio`)
        }

        // 2. CÁLCULO DE PREÇO E ESTOQUE
        let totalAmount = 0;
        let productsDetails: ProductDetail[] = [];

        for (const item of input.items) {
            const product = await this.bd.findProductById(item.productId);

            if (!product) {
                throw new Error(`Produto ${item.productId} não encontrado`)
            }

            totalAmount += product.price * item.quantity;
            totalAmount += product.calculateFreight();
            productsDetails.push(new ProductDetail(product, item.quantity));
        }

        // 3. PROCESSAMENTO DE PAGAMENTO
        const paymentMethod = PaymentFactory.createPayment(input.paymentMethod, input.paymentDetails)
        paymentMethod.process()

        // 4. PERSISTÊNCIA 
        const order = await this.bd.createOrder(new OrderBd(input.customer, productsDetails, totalAmount, "confirmed"))

        // 5. NOTIFICAÇÃO
        const orderNotificationData:OrderNotificationData = {
            orderId:order.orderId,
            customer:input.customer,
            totalAmount : totalAmount,
            items:productsDetails
        }
        const url = await this.notificationService.sendMail(orderNotificationData)

        return{orderId:order.orderId, emailPreview: url}

    }
}