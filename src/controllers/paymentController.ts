import Payment, { IPayment } from "../db/models/payment";
import { Request, Response, NextFunction } from "express";
import paymentService from "../services/paymentService";

async function listPayments(req: Request, res: Response, next: NextFunction) {
  try {
    let payments = await paymentService.listPayments();
    res.json(payments);
  } catch (error) {
    next(error);
  }
}

async function createPayment(req: Request, res: Response, next: NextFunction) {
  try {
    let payment = await paymentService.createPayment({
      payeeId: req.body.payeeId,
      payerId: req.body.payerId,
      paymentSystem: req.body.paymentSystem,
      paymentMethod: req.body.paymentMethod,
      amount: req.body.amount,
      currency: req.body.currency,
      comment: req.body.comment,
    });
    res.status(201).json(payment);
  } catch (error) {
    next(error);
  }
}

async function getPayment(req: Request, res: Response, next: NextFunction) {
  try {
    let payment = await paymentService.getPayment(req.params.id);
    res.json(payment);
  } catch (error) {
    next(error);
  }
}

async function approvePayment(req: Request, res: Response, next: NextFunction) {
  try {
    let approvedPayment = await paymentService.updateStatus(
      req.params.id,
      "approved"
    );
    res.json(approvedPayment);
  } catch (error) {
    next(error);
  }
}

async function cancelPayment(req: Request, res: Response, next: NextFunction) {
  try {
    let cancelledPayment = await paymentService.updateStatus(
      req.params.id,
      "cancelled"
    );
    res.json(cancelledPayment);
  } catch (error) {
    next(error);
  }
}

export default {
  listPayments,
  createPayment,
  getPayment,
  approvePayment,
  cancelPayment,
};
