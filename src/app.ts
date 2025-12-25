import express from 'express';
import { OrderController } from './controllers/OrderController';
import {orderService} from './services/OrderService';
import {PrismaOrderRepository} from './repositories/PrismaOrderRepository'

const app = express();
app.use(express.json());

const prisma = new PrismaOrderRepository
const order_S = new orderService(prisma);
const orderController = new OrderController(order_S);

// Rota única que faz tudo
app.post('/orders', orderController.processOrder);

export default app;