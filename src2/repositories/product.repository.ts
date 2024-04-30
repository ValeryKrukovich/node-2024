import { Product } from '../models/product.model';

class ProductRepository {
  private static products: Product[] = [];

  static getAllProducts(): Product[] {
    return this.products;
  }

  static createProduct(name: string, price: number): Product {
    const newProduct: Product = {
      id: this.generateProductId(),
      name,
      price,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  private static generateProductId(): string {
    // Implementation to generate unique product ID
    return 'generated-product-id';
  }
}

export default ProductRepository;
