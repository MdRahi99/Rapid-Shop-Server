import express from 'express';
import Cart from '../Models/Cart.js';

const router = express.Router();

router.get('/cart', async (req, res) => {
    try {
        const cartItems = await Cart.find();
        res.json({ cart: cartItems });
    } catch (error) {
        console.error('Error getting cart items:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.post('/cart', async (req, res) => {
    try {
        const { product } = req.body;

        const newItem = await Cart.create({ product });

        res.status(201).json({ message: 'Item added to cart', item: newItem });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.delete('/cart/:id', async (req, res) => {
    try {
        const itemId = req.params.id;
        await Cart.findByIdAndDelete(itemId);
        res.json({ message: 'Item removed from cart' });
    } catch (error) {
        console.error('Error removing item from cart:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default router;
