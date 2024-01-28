import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import usersController from './Controller/usersController.js';
import productsController from './Controller/productsController.js';
import cartController from './Controller/cartController.js';
import ordersController from './Controller/ordersController.js';

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nxhpsct.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Check MongoDB connection
const db = mongoose.connection;
db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Use the usersController
app.use('/api', usersController);
app.use('/api', productsController);
app.use('/api', cartController);
app.use('/api', ordersController);

app.get('/', (req, res) => {
  try {
    res.json(`Rapid Shop Server Running on PORT ${PORT}`);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
