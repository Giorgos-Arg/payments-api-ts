import mongoose, { Schema, Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import currencies from "./currencies";
export interface IPayment extends Document {
  payeeId: string;
  payerId: string;
  paymentSystem: string;
  paymentMethod: string;
  amount: number;
  currency: string;
  status?: string;
  comment?: string;
  created?: Date;
  updated?: Date;
}

const options = {
  toJSON: {
    transform: (doc: any, obj: any) => {
      obj.id = obj._id.toString();
      delete obj._id;
      delete obj.__v;
      return obj;
    },
  },
};

const paymentSchema = new Schema(
  {
    _id: { type: String, default: () => uuidv4() },
    payeeId: {
      type: String,
      required: true,
    },
    payerId: {
      type: String,
      required: true,
    },
    paymentSystem: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: [1, "Must be at least 1, got {VALUE}"],
      max: 9999999999,
    },
    currency: {
      type: String,
      enum: {
        values: currencies,
        message: "Invalid currency: {VALUE}",
      },
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["created", "approved", "cancelled"],
        message: "Invalid status: {VALUE}",
      },
      default: "created",
    },
    comment: {
      type: String,
      default: null,
    },
    created: {
      type: Date,
      default: new Date(),
    },
    updated: {
      type: Date,
      default: new Date(),
    },
  },
  options
);

const Payment = mongoose.model<IPayment>("Payment", paymentSchema);

export default Payment;
