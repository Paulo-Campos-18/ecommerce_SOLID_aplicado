import { IPaymentMethod } from "./IPaymentMethod";
import { LoggerProvider } from '../providers/LoggerProvider';

export class PixPayments implements IPaymentMethod {
    details: string
    private logger = LoggerProvider.getLogger();
    constructor(details: string) {
        this.details = details;
    }
    process(): void {
        const detailsJson = JSON.parse(this.details)
        if(!detailsJson.cpf) throw new Error("Pix recusado: cpf no formato incorreto ou inexistente")
        this.logger.info("Sucesso na transação com pix de cpf final " + detailsJson.cpf.slice(-4));
    }
}