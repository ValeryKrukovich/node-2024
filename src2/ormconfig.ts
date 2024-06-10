import { ConnectionOptions } from 'typeorm';
import { User } from './entities/User';
import { Product } from './entities/Product';
import { Cart } from './entities/Cart';
import { Order } from './entities/Order';

const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'shop_user',
  password: process.env.DB_PASSWORD || 'shop_password',
  database: process.env.DB_NAME || 'shop',
  entities: [User, Product, Cart, Order],
  synchronize: false, // Use migrations
  logging: process.env.NODE_ENV === 'development',
  migrations: ['dist/migration/*.js'],
  cli: {
    migrationsDir: 'src/migration'
  }
};

export default config;
