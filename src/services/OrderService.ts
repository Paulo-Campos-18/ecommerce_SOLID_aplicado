import {Product} from '../domain/IProduct'
import{ProductFactory} from '../domain/ProductFactory'
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


    async order(input:any) {

        // 1. VALIDAÇÃO (Deveria estar em outro lugar)
        if (!input.items || input.items.length === 0) {
            this.logger.error('Tentativa de pedido sem itens');
            throw new EmptyOrderError();
        }

        // 2. CÁLCULO DE PREÇO E ESTOQUE (Regra de Negócio Misturada) 
        let totalAmount = 0;
        let productsDetails = [];

        for (const item of input.items) {
            const product = await this.bd.findById(item.productId);

            if (!product) {
                return res.status(400).json({ error: `Produto ${item.productId} não encontrado` });
            }

            // Violação de LSP e OCP: 
            // Lógica condicional baseada em "tipo" (String). 
            // Se adicionarmos "Serviço" ou "Assinatura", teremos que mexer aqui.
            if (product.type === 'physical') {
                totalAmount += product.price * item.quantity;
                // Frete fixo simples
                totalAmount += 10;
            } else if (product.type === 'digital') {
                totalAmount += product.price * item.quantity;
                // Produtos digitais não deveriam ter frete, ok.
                // Mas se o aluno tentar tratar 'item' genericamente depois, vai ter problemas.
            }

            productsDetails.push({ ...product, quantity: item.quantity });
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