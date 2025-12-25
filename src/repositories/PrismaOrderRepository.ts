import { PrismaClient } from '@prisma/client';
import { IOrderRepository } from './IOrderRepository';
import { Product } from '../domain/Product';
import { ProductFactory } from '../domain/ProductFactory';
import { OrderBd } from '../dtos/OrderBd';
import {LoggerProvider} from '../providers/LoggerProvider'

export const prisma = new PrismaClient()
let logger = LoggerProvider.getLogger()

export class PrismaOrderRepository implements IOrderRepository {
    async findProductById(idProduto: number): Promise<Product | null> {
        const data = await prisma.product.findUnique({ where: { id: idProduto } });
        if (!data) return null;

        return ProductFactory.createProduct(data);
    }

    async createOrder(orderBd :OrderBd):Promise<void> {
        await prisma.order.create({
            data: {
                customer : orderBd.costumer,
                items: JSON.stringify(orderBd.items),
                total: orderBd.total,
                status: orderBd.status
            }
        });
            logger.info("Order adicionada ao banco de dados");
    }
}

