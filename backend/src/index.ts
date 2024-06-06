import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDatabase } from './database';
import productRoutes from './routes/products';
import orderRoutes from './routes/orders';
import orderItemRoutes from './routes/ordered_items';
import userRoutes from './routes/users';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

const corsOptions = {
  origin: 'https://bookstore-fullstack-client.onrender.com/', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/order_items', orderItemRoutes);
app.use('/api/users', userRoutes);

connectDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log('Failed to connect to the database:', error);
  });
