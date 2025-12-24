import { IPaymentMethod } from "./IPaymentMethod";
import { LoggerProvider } from '../providers/LoggerProvider';

export class DebitCard implements IPaymentMethod {
    details: string
    private logger = LoggerProvider.getLogger();
    constructor(details: string) {
        this.details = details;
    }

    process(): void {

        const detailsJson = JSON.parse(this.details)

        if (detailsJson.cvv === '000') throw new Error('Cartão recusado');
        //logger.info('Processando débito...');
        this.logger.info("Sucesso na transação com cartão de débito de final " + detailsJson.cardNumber.slice(-4));
    }
}