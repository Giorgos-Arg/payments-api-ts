import express from "express";
const router = express.Router();
import middleware from "../middleware";
import paymentController from "../controllers/paymentController";

router.get("/payments", middleware.verify, paymentController.listPayments);
router.post("/payments", middleware.verify, paymentController.createPayment);
router.get("/payment/:id", middleware.verify, paymentController.getPayment);
router.put(
  "/payments/:id/approve",
  middleware.verify,
  paymentController.approvePayment
);
router.put(
  "/payments/:id/cancel",
  middleware.verify,
  paymentController.cancelPayment
);

export default router;
