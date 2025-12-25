import { Product } from '../domain/Product';
import { OrderBd } from '../dtos/OrderBd';

export interface IOrderRepository{
    findProductById(id: number): Promise<Product | null>
    createOrder(orderBd :OrderBd):Promise<void>
}