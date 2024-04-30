import { Request, Response } from 'express';
import CartService from '../services/cart.service';

class CartController {
  static getCartByUserId(req: Request, res: Response) {
    const userId = req.header('x-user-id');
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized: Missing user ID' });
    }
    const cart = CartService.getCartByUserId(userId);
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    res.status(200).json({ data: cart });
  }

  static createCart(req: Request, res: Response) {
    const userId = req.header('x-user-id');
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized: Missing user ID' });
    }
    const cart = CartService.createCart(userId);
    res.status(201).json({ data: cart });
  }

  static updateCart(req: Request, res: Response) {
    const cartId = req.params.cartId;
    const updatedCart = req.body;
    const updatedCartResult = CartService.updateCart(cartId, updatedCart);
    if (!updatedCartResult) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    res.status(200).json({ data: updatedCartResult });
  }

  static deleteCart(req: Request, res: Response) {
    const cartId = req.params.cartId;
    CartService.deleteCart(cartId);
    res.status(200).json({ success: true });
  }
}

export default CartController;
