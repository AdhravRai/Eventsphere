import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["EventRegistration", "Subscription"],
      required: true,
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      default: null, // only used when type === "EventRegistration"
    },
    plan: {
      type: String,
      enum: ["Gold", "Premium"],
      default: null,
    },
    amount: {
      type: Number,
      required: true,
    },
    transactionId: {
      type: String,
      required: [true, "UPI transaction reference ID is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["Pending Verification", "Verified", "Rejected"],
      default: "Pending Verification",
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;