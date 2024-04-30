import { Order } from '../models/order.model';
import { OrderRepository } from '../repositories/order.repository';

class OrderService {
  static getAllOrdersByUserId(userId: string): Order[] {
    // Implementation to get all orders by user ID
    return OrderRepository.getAllOrdersByUserId(userId);
  }

  static createOrder(userId: string, products: string[]): Order {
    // Implementation to create a new order
    return OrderRepository.createOrder(userId, products);
  }
}

export default OrderService;
