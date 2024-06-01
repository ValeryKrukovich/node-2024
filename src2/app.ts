import express from 'express';
import userRoutes from './routes/user.routes';
import productRoutes from './routes/product.routes';
import cartRoutes from './routes/cart.routes';
import orderRoutes from './routes/order.routes';
import authenticationMiddleware from './middleware/uthentication.middleware';
import connectDB from './database';

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(authenticationMiddleware);

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
