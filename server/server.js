// Imports
import express from 'express';
import dotenv from 'dotenv';
import { logReq, globalErr } from './middleware/middlewares.js';
import cors from "cors";
import mongoose from "mongoose";

// Routes
import characterRoutes from './routes/characters.js'; 
import authRoutes from './routes/auth.js';


// Setups
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Database connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log(err));

// Middleware
app.use(cors())
app.use(express.json());
app.use(logReq);

// Routes
app.use('/api/characters', characterRoutes); 
app.use('/api/auth', authRoutes);

// Global error handling
app.use(globalErr);

// Listener
app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});