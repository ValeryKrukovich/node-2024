import express from 'express';
import OrderController from '../controllers/order.controller';

const router = express.Router();

router.get('/', OrderController.getAllOrdersByUserId);
router.post('/', OrderController.createOrder);

export default router;
