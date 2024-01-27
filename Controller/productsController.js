import express from 'express';
import mongoose from 'mongoose';
import Products from '../Models/Products.js';

const router = express.Router();

// Route to get all products
router.get('/products', async (req, res) => {
    try {
        const products = await Products.find();
        res.json({ success: true, message: 'Products retrieved successfully.', data: products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

// Get a single product by ID
router.get('/products/:productId', async (req, res) => {
    try {
        const productId = req.params.productId;

        const product = await Products.findById(productId);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found.' });
        }

        res.json({ success: true, message: 'Product retrieved successfully.', data: product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

// Route to add a new product
router.post('/products', async (req, res) => {
    const { Name, Price, ImageUrl, Description, Rating } = req.body;

    try {
        // Validate request body
        if (!Name || typeof Price !== 'number' || !ImageUrl || !Description || typeof Rating !== 'number') {
            return res.status(400).json({ success: false, message: 'Invalid request body. Make sure all required fields are provided and have correct data types.' });
        }

        const newProduct = new Products({
            Name,
            Price,
            ImageUrl,
            Description,
            Rating
        });

        const savedProduct = await newProduct.save();

        res.status(201).json({ success: true, message: 'Product added successfully.', data: savedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

// Route to delete a product by ID
router.delete('/products/:id', async (req, res) => {
    const productId = req.params.id;

    try {
        if (!mongoose.isValidObjectId(productId)) {
            return res.status(400).json({ success: false, message: 'Invalid product ID.' });
        }

        const deletedProduct = await Products.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found.' });
        }

        res.json({ success: true, message: 'Product deleted successfully.', data: deletedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

export default router;
