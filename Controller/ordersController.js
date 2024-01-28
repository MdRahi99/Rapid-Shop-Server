import express from 'express';
import Orders from '../Models/Orders.js';

const router = express.Router();

router.get('/orders', async (req, res) => {
    try {
        const orders = await Orders.find();
        res.json({ orders });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'An error occurred while fetching orders.' });
    }
});

router.post('/orders', async (req, res) => {
    try {
        const { name, phone, address, price } = req.body;

        const newOrder = new Orders({
            name,
            phone,
            address,
            price
        });

        const savedOrder = await newOrder.save();

        res.status(201).json(savedOrder);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'An error occurred while creating the order.' });
    }
});

router.delete('/orders/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedOrder = await Orders.findByIdAndDelete(id);

        if (!deletedOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ error: 'An error occurred while deleting the order.' });
    }
});

export default router;
