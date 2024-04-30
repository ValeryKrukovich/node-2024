import { Order } from '../models/order.model';

class OrderRepository {
  private static orders: Order[] = [];

  static getAllOrdersByUserId(userId: string): Order[] {
    return this.orders.filter(order => order.userId === userId);
  }

  static createOrder(userId: string, products: string[]): Order {
    const newOrder: Order = {
      id: this.generateOrderId(),
      userId,
      products,
    };
    this.orders.push(newOrder);
    return newOrder;
  }

  private static generateOrderId(): string {
    // Implementation to generate unique order ID
    return 'generated-order-id';
  }
}

export default OrderRepository;
