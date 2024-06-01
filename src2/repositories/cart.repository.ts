import { Cart } from '../models/cart.model';

class CartRepository {
  static async getCartByUserId(userId: string) {
    return Cart.findOne({ userId, deleted: false });
  }

  static async createCart(userId: string) {
    const cart = new Cart({ id: this.generateCartId(), userId, products: [] });
    return cart.save();
  }

  static async updateCart(cartId: string, updatedCart: any) {
    return Cart.findByIdAndUpdate(cartId, updatedCart, { new: true });
  }

  static async deleteCart(cartId: string) {
    return Cart.findByIdAndUpdate(cartId, { deleted: true });
  }

  private static generateCartId(): string {
    // Implementation to generate unique cart ID
    return 'generated-cart-id';
  }
}

export default CartRepository;
