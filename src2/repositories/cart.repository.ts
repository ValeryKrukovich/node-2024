import { Cart } from '../models/cart.model';

class CartRepository {
  private static carts: Cart[] = [];

  static getCartByUserId(userId: string): Cart | undefined {
    return this.carts.find(cart => cart.userId === userId && !cart.deleted);
  }

  static createCart(userId: string): Cart {
    const newCart: Cart = {
      id: this.generateCartId(),
      userId,
      products: [],
      deleted: false,
    };
    this.carts.push(newCart);
    return newCart;
  }

  static updateCart(cartId: string, updatedCart: Cart): Cart | undefined {
    const index = this.carts.findIndex(cart => cart.id === cartId && !cart.deleted);
    if (index !== -1) {
      this.carts[index] = updatedCart;
      return updatedCart;
    }
    return undefined;
  }

  static deleteCart(cartId: string): void {
    const index = this.carts.findIndex(cart => cart.id === cartId && !cart.deleted);
    if (index !== -1) {
      this.carts[index].deleted = true;
    }
  }

  private static generateCartId(): string {
    // Implementation to generate unique cart ID
    return 'generated-cart-id';
  }
}

export default CartRepository;
