export interface processOrderInput {
    customer: string;
    items: Map<number, number>;
    paymentMethod: string;
    paymentDetails: string
}