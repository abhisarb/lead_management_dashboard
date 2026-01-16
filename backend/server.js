require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const leadRoutes = require('./routes/leadRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Root Route
app.get('/', (req, res) => {
    res.send('Lead Management API is running...');
});

// Routes
app.use('/api/leads', leadRoutes);

// Basic Auth Mock
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    if (email === 'admin@crm.com' && password === 'admin123') {
        res.json({ token: 'mock-jwt-token', user: { name: 'Admin', email } });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });
