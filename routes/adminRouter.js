import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const router = express.Router();

import {
  adminPage,
  productPage,
  cashierPage,
  offerPage,
  AllReviews,
  orderPage,
} from '../controller/adminController.js';

// ===============================
// Admin Routes
// ===============================

// Cashier
router.get(`/cashier/${process.env.CASHIER_PASSWORD}`, cashierPage);

// Products
router.get(`/products/${process.env.ADMIN_PASSWORD}`, productPage);

// Offers
router.get(`/offers/${process.env.ADMIN_PASSWORD}`, offerPage);

// Orders
router.get(`/orders/${process.env.ADMIN_PASSWORD}`, orderPage);

// Dashboard
router.get(`/dashboard/${process.env.ADMIN_PASSWORD}`, adminPage);

// Reviews (if needed later)
// router.get(
//   `/reviews/${process.env.ADMIN_PASSWORD}`,
//   AllReviews
// );

export default router;
