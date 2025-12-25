import { CreditCard } from './CreditCardPayment';
import { IPaymentMethod } from "./IPaymentMethod";
import { DebitCard } from './DebitCardPayment';
import { PixPayments } from './PixPayment';

export class PaymentFactory {
    static createPayment(paymentMethod: string, paymentDetails: string): IPaymentMethod {

        switch (paymentMethod) {
            case "credit_card":
                return new CreditCard(paymentDetails);
            case "debit_card":
                return new DebitCard(paymentDetails);
            case "pix":
                return new PixPayments(paymentDetails)
            default:
                throw new Error('Unknown payment method');
        }

    }
}

