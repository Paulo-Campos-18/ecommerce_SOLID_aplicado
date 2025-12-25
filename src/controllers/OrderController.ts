import { Request, Response } from 'express';
import { getMailClient } from '../lib/mail';
import nodemailer from 'nodemailer';
import { orderService } from '../services/OrderService'
import { LoggerProvider } from '../providers/LoggerProvider';
import { ProcessOrderInput } from '../dtos/ProcessOrderInput';
import { ILogger } from '../lib/ILogger';




// Lembram do God Class q falamos em aula? Este é um exemplo
export class OrderController {
  private service: orderService;
  private logger: ILogger

  constructor(service: orderService) {
    this.service = service;
    this.logger = LoggerProvider.getLogger();
  }

  async processOrder(req: Request, res: Response) {
    try {
      const input: ProcessOrderInput = {
        customer: req.body.customer,
        items: req.body.items.map((item: any) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
        paymentMethod: req.body.paymentMethod,
        paymentDetails: JSON.stringify(req.body.paymentDetails),
      };

      await this.service.order(input)

    } catch (error: any) {
      //Como não é o foco do trabalho não vou criar um erro para cada tipo, vou usar o tipo genérico e ir mudando as menssagens
      this.logger.error(`Erro ao processar pedido: ${error.message}`);
      return res.status(400).json({ error: error.message });
    }
  }
}

