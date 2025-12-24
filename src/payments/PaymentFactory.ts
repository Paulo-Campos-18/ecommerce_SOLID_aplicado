import { CreditCard } from './CreditCardPayment';
import { IPaymentMethod } from "./IPaymentMethod";
import { DebitCard } from './DebitCardPayment';
import { PixPayments } from './PixPayment';

export class PaymentFactory {
    static createPayment(paymentMethod: string, paymentDetails: string): IPaymentMethod {

        switch (paymentMethod) {
            case "credit_card":
                return new CreditCard(paymentDetails);
                break;
            case "debit_card ":
                return new DebitCard(paymentDetails);
                break;

            case "pix":
                return new PixPayments(paymentDetails)
                break;

            default:
                throw new Error('Unknown payment method');
                break;
        }

    }
}

