import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import expressWinston from 'express-winston';
import logger from '../logger';
import userRoutes from './routes/user.routes';
import productRoutes from './routes/product.routes';
import cartRoutes from './routes/cart.routes';
import orderRoutes from './routes/order.routes';
import authenticationMiddleware from './middleware/uthentication.middleware';
// import connectDB from './database';
import { createConnection } from 'typeorm';
import config from './ormconfig'

dotenv.config();

const app = express();

// Connect to MongoDB
// connectDB();

// const MONGO_URI = process.env.MONGO_URI;

// mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => logger.info('Connected to MongoDB'))
//   .catch(err => logger.error(`Could not connect to MongoDB: ${err.message}`));
// ;

createConnection(config).then(() => {
  logger.info('Connected to PostgreSQL database');
}).catch(error => {
  logger.error('Could not connect to the database:', error);
});

// Middleware
app.use(express.json());

app.use(expressWinston.logger({
  winstonInstance: logger,
  msg: (req, res) => {
    const responseTime = res.get('X-Response-Time');
    return `${req.method} ${req.url} ${responseTime}`;
  },
  meta: false,
}));

app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    res.set('X-Response-Time', `${duration}ms`);
  });
  next();
});

app.get('/api/healthcheck', async (req, res) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
    database: 'Disconnected'
  };

  try {
    await mongoose.connection.db.admin().ping();
    healthcheck.database = 'Connected';
    res.status(200).json(healthcheck);
  } catch (error) {
    healthcheck.message = error;
    res.status(500).json(healthcheck);
  }
});

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

const gracefulShutdown = () => {
  logger.info('Shutting down gracefully...');
  server.close(() => {
    logger.info('Closed out remaining connections.');
    process.exit(0);
  });

  setTimeout(() => {
    logger.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
