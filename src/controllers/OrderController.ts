import { Request, Response } from 'express';

import { getMailClient } from '../lib/mail';
import nodemailer from 'nodemailer';
import logger from '../lib/logger';
import {orderService} from '../services/OrderService'




// Lembram do God Class q falamos em aula? Este é um exemplo
export class OrderController {
    private service : orderService;

  constructor(service:orderService){
    this.service = service;
  }
  
  // Método Gigante: Violação de SRP
  async processOrder(req: Request, res: Response) {
    try {
      const input = req.body;

      const result = await this.service.order(input)


      
      
    } catch (error: any) {
      if(error instanceof ){
        return res.status(400).json({ error: 'Carrinho vazio' });
      }


      logger.error(`Erro ao processar pedido: ${error.message}`);
      return res.status(500).json({ error: 'Erro interno' });
    }
  }
}

