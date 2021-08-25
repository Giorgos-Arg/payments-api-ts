import CustomError from "./CustomError";

class PaymentError extends CustomError {
  static notFound() {
    return new CustomError(404, "ERR_PAYMENT_NOT_FOUND", "Payment not found");
  }
  static cannotApprove() {
    return new CustomError(
      400,
      "ERR_CANNOT_APPROVE",
      "Cannot approve a payment that has already been approved/cancelled"
    );
  }

  static cannotCancel() {
    return new CustomError(
      400,
      "ERR_CANNOT_CANCEL",
      "Cannot cancel a payment that has already been approved/cancelled"
    );
  }
}

export default PaymentError;
