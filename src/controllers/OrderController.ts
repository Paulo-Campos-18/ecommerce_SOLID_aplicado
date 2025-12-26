import { Request, Response } from 'express';
import { orderService } from '../services/OrderService'
import { LoggerProvider } from '../providers/LoggerProvider';
import { ProcessOrderInput } from '../dtos/ProcessOrderInput';
import { ILogger } from '../lib/ILogger';

export class OrderController {
  private service: orderService;
  private logger: ILogger

  constructor(service: orderService) {
    this.service = service;
    this.logger = LoggerProvider.getLogger();
  }

  processOrder = async (req: Request, res: Response) => {
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

      const result = await this.service.order(input)

      return res.status(200).json({
        message: 'Pedido processado com sucesso',
        orderId: result.orderId,
        emailPreview: result.emailPreview // Retorna o link na API para facilitar
      });


    } catch (error: any) {
      //Como não é o foco do trabalho não vou criar um erro para cada tipo, vou usar o tipo genérico e ir mudando as menssagens
      this.logger.error(`Erro ao processar pedido: ${error.message}`);
      return res.status(400).json({ error: error.message });
    }
  }
}

