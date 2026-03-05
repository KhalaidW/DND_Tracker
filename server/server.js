// Imports
import express from 'express';
import dotenv from 'dotenv';
import { logReq, globalErr } from './middleware/middlewares.js';
import cors from "cors";

// Routes
import characterRoutes from './routes/characters.js'; 

// Setups
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors())
app.use(express.json());
app.use(logReq);

// Routes
app.use('/api/characters', characterRoutes); 

// Global error handling
app.use(globalErr);

// Listener
app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});