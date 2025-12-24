import { OrderItemInput } from "./OrderItemInput";
export interface ProcessOrderInput {
  customer: string;
  items: OrderItemInput[];
  paymentMethod: string;
  paymentDetails: string;
}