import { Request, Response } from 'express';
import CartService from '../services/cart.service';

class CartController {
  static async getCartByUserId(req: Request, res: Response) {
    try {
      const cart = await CartService.getCartByUserId(req.user.id);
      res.status(200).json({ data: cart });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  static async deleteCart(req: Request, res: Response) {
    try {
      await CartService.deleteCart(req.params.cartId);
      res.status(200).json({ data: { success: true } });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default CartController;
