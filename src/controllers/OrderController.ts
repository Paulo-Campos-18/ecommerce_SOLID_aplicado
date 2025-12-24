import { Request, Response } from 'express';
import { getMailClient } from '../lib/mail';
import nodemailer from 'nodemailer';
import {orderService} from '../services/OrderService'
import { ILogger } from '../lib/ILogger';
import { ProcessOrderInput } from '../dtos/ProcessOrderInput';




// Lembram do God Class q falamos em aula? Este é um exemplo
export class OrderController {
    private service : orderService;
    private logger:ILogger

  constructor(service:orderService,logger:ILogger){
    this.service = service;
    this.logger = logger
  }
  
  // Método Gigante: Violação de SRP
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

      const result = await this.service.order(input)


      
      
    } catch (error: any) {
      //Como não é o foco do trabalho não vou criar um erro para cada tipo, vou usar o tipo genérico e ir mudando as menssagens
      if(error ){
        return res.status(400).json({ error: 'Carrinho vazio' });
      }


      this.logger.error(`Erro ao processar pedido: ${error.message}`);
      return res.status(500).json({ error: 'Erro interno' });
    }
  }
}

