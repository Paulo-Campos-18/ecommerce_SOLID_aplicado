import { ProcessOrderInput } from '../dtos/ProcessOrderInput';
import { ProductDetail } from '../dtos/ProductDetail';
import { LoggerProvider } from '../providers/LoggerProvider';
import { IOrderRepository } from '../repositories/IOrderRepository';
import { PaymentFactory } from '../payments/PaymentFactory'
import { OrderBd } from '../dtos/OrderBd';

export class orderService {
    private bd: IOrderRepository
    private logger = LoggerProvider.getLogger();

    constructor(bd: IOrderRepository) {
        this.bd = bd;
    }

    async order(input: ProcessOrderInput) {

        // 1. VALIDAÇÃO (Deveria estar em outro lugar)
        if (!input.items || input.items.length === 0) {
            this.logger.error('Tentativa de pedido sem itens');
            throw new Error(`Carrinho vazio`)
        }

        // 2. CÁLCULO DE PREÇO E ESTOQUE (Regra de Negócio Misturada) 
        let totalAmount = 0;
        let productsDetails: ProductDetail[] = [];

        for (const item of input.items) {
            const product = await this.bd.findProductById(item.productId);

            if (!product) {
                throw new Error(`Produto ${item.productId} não encontrado`)
                //return res.status(400).json({ error: `Produto ${item.productId} não encontrado` });
            }

            totalAmount += product.price * item.quantity;
            totalAmount += product.calculateFreight();
            productsDetails.push(new ProductDetail(product, item.quantity));
        }

        // 3. PROCESSAMENTO DE PAGAMENTO
        const paymentMethod = PaymentFactory.createPayment(input.paymentMethod, input.paymentDetails)
        paymentMethod.process()

        // 4. PERSISTÊNCIA 

        await this.bd.createOrder(new OrderBd(input.customer, productsDetails, totalAmount, "confirmed"))

        // 5. NOTIFICAÇÃO (Violação de SRP - Efeitos colaterais no Controller) 

    }

}