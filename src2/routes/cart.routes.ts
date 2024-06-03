import express from 'express';
import CartController from '../controllers/cart.controller';
import authenticationMiddleware from '../middleware/authentication.middleware';
import adminAuthorizationMiddleware from '../middleware/authorization.middleware';

const router = express.Router();

router.use(authenticationMiddleware);

router.get('/:userId', CartController.getCartByUserId);
router.delete('/:cartId', adminAuthorizationMiddleware, CartController.deleteCart);

export default router;
