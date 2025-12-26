import express from 'express';
import { OrderController } from './controllers/OrderController';
import {orderService} from './services/OrderService';
import {PrismaOrderRepository} from './repositories/PrismaOrderRepository'
import { EtheralMailProvider } from './providers/EtheralMailProvider';
import { NotificationService } from './services/NotificationService';

const app = express();
app.use(express.json());

const prisma = new PrismaOrderRepository
const etheralMailProvider = new EtheralMailProvider()
const notificationService = new NotificationService(etheralMailProvider)
const order_S = new orderService(prisma,notificationService);
const orderController = new OrderController(order_S);


app.post('/orders', orderController.processOrder);

export default app;