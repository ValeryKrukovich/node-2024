import { Request, Response } from 'express';
import ProductService from '../services/product.service';

class ProductController {
  static getAllProducts(req: Request, res: Response) {
    const products = ProductService.getAllProducts();
    res.status(200).json({ data: products });
  }

  static createProduct(req: Request, res: Response) {
    const { name, price } = req.body;
    if (!name || !price) {
      return res.status(400).json({ error: 'Name and price are required' });
    }
    const product = ProductService.createProduct(name, price);
    res.status(201).json({ data: product });
  }
}

export default ProductController;
