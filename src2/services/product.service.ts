import { Product } from '../models/product.model';
import { ProductRepository } from '../repositories/product.repository';

class ProductService {
  static getAllProducts(): Product[] {
    // Implementation to get all products
    return ProductRepository.getAllProducts();
  }

  static createProduct(name: string, price: number): Product {
    // Implementation to create a new product
    return ProductRepository.createProduct(name, price);
  }
}

export default ProductService;
