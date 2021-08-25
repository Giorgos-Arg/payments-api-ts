import Payment from "../db/models/payment";
import PaymentError from "../errors/PaymentError";

async function listPayments() {
  return await Payment.find();
}
async function createPayment(args: {
  payeeId: string;
  payerId: string;
  paymentSystem: string;
  paymentMethod: string;
  amount: number;
  currency: string;
  comment: string;
}) {
  const newPayment = new Payment({
    payeeId: args.payeeId,
    payerId: args.payerId,
    paymentSystem: args.paymentSystem,
    paymentMethod: args.paymentMethod,
    amount: args.amount,
    currency: args.currency,
    comment: args.comment,
  });
  return await newPayment.save();
}

async function getPayment(paymentId: string) {
  let payment = await Payment.findById(paymentId);
  if (!payment) {
    throw PaymentError.notFound();
  }
  return payment;
}

async function updateStatus(paymentId: string, status: string) {
  let payment = await getPayment(paymentId);
  if (payment.status !== "created") {
    if (status === "approve") {
      throw PaymentError.cannotApprove();
    }
    throw PaymentError.cannotCancel();
  }
  let updatedPayment = await Payment.findOneAndUpdate(
    { _id: paymentId },
    { status: status, updated: new Date() },
    { new: true }
  );
  return updatedPayment;
}

export default {
  listPayments,
  createPayment,
  getPayment,
  updateStatus,
};
