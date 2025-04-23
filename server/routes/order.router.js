import express from "express";
import { getMyOrders } from "../controllers/order.controller.js";
// import { protect } from "../middleware/authMiddleware.js"; // JWT middleware
import { Authenticated } from "../middlewares/auth.middleware.js";
const router = express.Router();

// router.post("/create", Authenticated, createOrder);
router.get("/my-order", Authenticated, getMyOrders);

export default router;
