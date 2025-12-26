import{ProductDetail} from './ProductDetail'
export interface OrderNotificationData {
  orderId: number
  customer: string
  totalAmount: number
  items: ProductDetail[]
}
