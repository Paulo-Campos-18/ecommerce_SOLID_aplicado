import { PrismaClient } from '@prisma/client';
import { IOrderRepository } from './IOrderRepository';
import { Product } from '../domain/IProduct';
import { ProductFactory } from '../domain/ProductFactory';

export const prisma = new PrismaClient()

class PrismaOrderRepository implements IOrderRepository {
    async findById(idProduto: number): Promise<Product | null> {
        const data = await prisma.product.findUnique({ where: { id: idProduto } });
        if (!data) return null;

        return ProductFactory.createProduct(data);
    }

    async create(input) {
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

