import express from 'express';
import CartController from '../controllers/cart.controller';

const router = express.Router();

router.get('/', CartController.getCartByUserId);
router.post('/', CartController.createCart);
router.put('/:cartId', CartController.updateCart);
router.delete('/:cartId', CartController.deleteCart);

export default router;
