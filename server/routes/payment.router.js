import express from 'express';
import { createOrder, verifyPayment } from '../controllers/payment.controller.js';
import { Authenticated } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/create-order', Authenticated, createOrder);
router.post('/verify-payment', Authenticated, verifyPayment);

export default router;
