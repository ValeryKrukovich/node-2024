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

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', authenticationMiddleware, userRoutes);
app.use('/api/products', authenticationMiddleware, productRoutes);
app.use('/api/carts', authenticationMiddleware, cartRoutes);
app.use('/api/orders', authenticationMiddleware, orderRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
