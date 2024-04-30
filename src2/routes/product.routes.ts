import express from 'express';
import ProductController from '../controllers/product.controller';

const router = express.Router();

router.get('/', ProductController.getAllProducts);
router.post('/', ProductController.createProduct);

export default router;
