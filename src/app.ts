import express from 'express';
import { OrderController } from './controllers/OrderController';
import {orderService} from './services/OrderService';

const order_S = new orderService();
const app = express();
app.use(express.json());

const orderController = new OrderController();

// Rota única que faz tudo
app.post('/orders', orderController.processOrder);

export default app;