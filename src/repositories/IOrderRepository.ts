import { Product } from '../domain/Product';
import { OrderBd } from '../dtos/OrderBd';

export interface IOrderRepository{
    findProductById(id: number): Promise<Product | null>
    createOrder(orderBd :OrderBd):Promise<{orderId:number,createAt:Date}>
    //Peço esse retorno pois são os dados de que faltam na hora fazer a notificação por email
    //No caso o id me faltava já que ele é criado dentro do bd, o resto como email e totalamount eu consigo no proprio OrderService
    //Uma interface parece desnecessária já que independente da biblioteca o bd é o mesmo e eu projeto é pequeno
}