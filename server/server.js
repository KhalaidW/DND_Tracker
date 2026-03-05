// Imports
import express from 'express';
import dotenv from 'dotenv';
import { logReq, globalErr } from './middleware.js';

// Routes

// Setups
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(logReq);

// Routes

// Global error handling
app.use(globalErr);

// Listener
app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});