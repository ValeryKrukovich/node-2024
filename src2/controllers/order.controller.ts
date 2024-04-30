import { Request, Response } from 'express';
import OrderService from '../services/order.service';

class OrderController {
  static getAllOrdersByUserId(req: Request, res: Response) {
    const userId = req.header('x-user-id');
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized: Missing user ID' });
    }
    const orders = OrderService.getAllOrdersByUserId(userId);
    res.status(200).json({ data: orders });
  }

  static createOrder(req: Request, res: Response) {
    const userId = req.header('x-user-id');
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized: Missing user ID' });
    }
    const { products } = req.body;
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: 'Products array is required' });
    }
    const order = OrderService.createOrder(userId, products);
    res.status(201).json({ data: order });
  }
}

export default OrderController;
