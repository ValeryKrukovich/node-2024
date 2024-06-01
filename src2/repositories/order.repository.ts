import { Order } from '../models/order.model';

class OrderRepository {
  static async getAllOrdersByUserId(userId: string) {
    return Order.find({ userId });
  }

  static async createOrder(userId: string, products: any) {
    const order = new Order({ id: this.generateOrderId(), userId, products });
    return order.save();
  }

  private static generateOrderId(): string {
    // Implementation to generate unique order ID
    return 'generated-order-id';
  }
}

export default OrderRepository;

