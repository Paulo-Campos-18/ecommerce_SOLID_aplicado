import {Product} from '../domain/IProduct'
import{ProductFactory} from '../domain/ProductFactory'
import { ProcessOrderInput } from '../dtos/ProcessOrderInput';
import { ProductDetail } from '../dtos/ProductDetail';
import { ILogger } from '../lib/ILogger';
import { IOrderRepository } from '../repositories/IOrderRepository';

export class orderService {
    private productFactory:ProductFactory
    private bd:IOrderRepository
    private logger:ILogger 

    constructor(bd:IOrderRepository,logger:ILogger){
        this.productFactory = new ProductFactory()
        this.bd = bd;
        this.logger = logger;
    }


    async order(input:ProcessOrderInput) {

        // 1. VALIDAÇÃO (Deveria estar em outro lugar)
        if (!input.items || input.items.length === 0) {
            this.logger.error('Tentativa de pedido sem itens');
            throw new Error(`Carrinho vazio`)
        }

        // 2. CÁLCULO DE PREÇO E ESTOQUE (Regra de Negócio Misturada) 
        let totalAmount = 0;
        let productsDetails:ProductDetail[] = [];

        for (const item of input.items) {
            const product = await this.bd.findById(item.productId);

            if (!product) {
                throw new Error(`Produto ${item.productId} não encontrado`)
                return res.status(400).json({ error: `Produto ${item.productId} não encontrado` });
            }


            totalAmount += product.price * item.quantity;
            totalAmount += product.calculateFreight();
                // Produtos digitais não deveriam ter frete, ok.
                // Mas se o aluno tentar tratar 'item' genericamente depois, vai ter problemas.
            

            productsDetails.push( new ProductDetail(product,item.quantity));
        }

        // 3. PROCESSAMENTO DE PAGAMENTO (Violação de OCP)
        // Se quisermos adicionar "Pix", temos que modificar essa classe.
        if (paymentMethod === 'credit_card') {
            logger.info(`Processando cartão final ${paymentDetails.cardNumber.slice(-4)}`);
            // Simulação de gateway
            if (paymentDetails.cvv === '000') throw new Error('Cartão recusado');

        } else if (paymentMethod === 'debit_card') {
            logger.info('Processando débito...');
            // Lógica de débito
        } else {
            return res.status(400).json({ error: 'Método de pagamento não suportado' });
        }

        // 4. PERSISTÊNCIA (Violação de SRP - Controller acessando Banco) 
        const order = await prisma.order.create({
            data: {
                customer,
                items: JSON.stringify(productsDetails),
                total: totalAmount,
                status: 'confirmed'
            }
        });
    }

}