import express from 'express';
import bcrypt from 'bcrypt';
import Users from '../Models/Users.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/user', async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await Users.findOne({ phoneNumber: decoded.phoneNumber });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Unauthorized' });
    }
});

router.post('/register', async (req, res) => {
    const { phoneNumber, password } = req.body;

    try {
        const existingUser = await Users.findOne({ phoneNumber });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new Users({ phoneNumber, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/login', async (req, res) => {
    const { phoneNumber, password } = req.body;

    try {
        const existingUser = await Users.findOne({ phoneNumber });

        if (!existingUser) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const passwordMatch = await bcrypt.compare(password, existingUser.password);

        if (!passwordMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: existingUser._id, phoneNumber: existingUser.phoneNumber },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.status(200).json({ success: true, message: 'Sign In successful', token });

    } catch (error) {
        console.error('Error during sign-in:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

export default router;
