import express from 'express';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import customersRouter from './routes/customers';
import dotenv from "dotenv"
import { env } from './config/env';
const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();
// ── Middleware ──────────────────────────────────────────────────────────────

app.use(cors());                        // allow frontend fetch from any origin
app.use(express.json());

// Serve the dashboard: anything in /public is available at http://localhost:3000
app.use(express.static(path.join(__dirname, '..', 'public')));

// ── API Routes ──────────────────────────────────────────────────────────────

app.use('/api/customers', customersRouter);

// ── DB + Server ─────────────────────────────────────────────────────────────

const MONGO_URI = env.MONGODB_URI || "no uri";


mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
    app.listen(PORT, () =>
      console.log(`🚀 Server running → http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err);
    process.exit(1);
  });
