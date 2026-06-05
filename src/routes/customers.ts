import { Router, Request, Response } from 'express';
import { Customer } from '../models/Customers';

const router = Router();

/**
 * GET /api/customers
 * Returns all registered customers sorted by createdAt descending (newest first).
 */
router.get('/', async (_req: Request, res: Response) => {
  try {
    const customers = await Customer.find({})
      .sort({ createdAt: -1 })
      .lean(); // plain JS objects — faster, no Mongoose overhead

    res.json(customers);
  } catch (error) {
    console.error('[GET /api/customers] DB error:', error);
    res.status(500).json({ message: 'Failed to fetch customers' });
  }
});

export default router;
