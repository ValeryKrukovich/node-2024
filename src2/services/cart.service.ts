import { Cart } from '../models/cart.model';
import { CartRepository } from '../repositories/cart.repository';

class CartService {
  static getCartByUserId(userId: string): Cart | undefined {
    // Implementation to get cart by user ID
    return CartRepository.getCartByUserId(userId);
  }

  static createCart(userId: string): Cart {
    // Implementation to create a new cart
    return CartRepository.createCart(userId);
  }

  static updateCart(cartId: string, updatedCart: Cart): Cart | undefined {
    // Implementation to update an existing cart
    return CartRepository.updateCart(cartId, updatedCart);
  }

  static deleteCart(cartId: string): void {
    // Implementation to delete a cart
    CartRepository.deleteCart(cartId);
  }
}

export default CartService;
