import { Product } from '../domain/IProduct';
import { PhysicalProduct } from '../domain/PhysicalProduct';
import { DigitalProduct } from '../domain/DigitalProduct';


export interface IOrderRepository{
    findById(id: number): Promise<Product | null>

}