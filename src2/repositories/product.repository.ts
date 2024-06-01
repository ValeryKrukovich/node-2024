import { Product } from '../models/product.model';

class ProductRepository {
  static async getAllProducts() {
    return Product.find();
  }

  static async createProduct(name: string, price: number) {
    const product = new Product({ id: this.generateProductId(), name, price });
    return product.save();
  }

  private static generateProductId(): string {
    // Implementation to generate unique product ID
    return 'generated-product-id';
  }
}

export default ProductRepository;
