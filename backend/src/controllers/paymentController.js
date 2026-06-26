import Payment from "../models/Payment.js";
import User from "../models/User.js";

// POST /api/payments - student submits a payment claim (event reg or subscription)
export const submitPayment = async (req, res) => {
  try {
    const { type, eventId, plan, amount, transactionId } = req.body;

    if (!type || !amount || !transactionId) {
      return res.status(400).json({
        success: false,
        message: "type, amount, and transactionId are required",
      });
    }

    const payment = await Payment.create({
      user: req.user.id,
      type,
      event: type === "EventRegistration" ? eventId : null,
      plan: type === "Subscription" ? plan : null,
      amount,
      transactionId,
    });

    res.status(201).json({
      success: true,
      message: "Payment claim submitted. Awaiting admin verification.",
      payment,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/payments/pending - admin only
export const getPendingPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ status: "Pending Verification" })
      .populate("user", "name email")
      .populate("event", "title");

    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/payments/:id/verify - admin only
export const verifyPayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      return res.status(404).json({ success: false, message: "Payment not found" });
    }

    payment.status = "Verified";
    await payment.save();

    // If it's a subscription payment, upgrade the user's plan
    if (payment.type === "Subscription" && payment.plan === "Premium") {
      await User.findByIdAndUpdate(payment.user, {
        subscription: {
          plan: "Premium",
          verifiedAt: new Date(),
        },
      });
    }

    res.status(200).json({ success: true, message: "Payment verified", payment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/payments/:id/reject - admin only
export const rejectPayment = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      { status: "Rejected" },
      { new: true }
    );

    if (!payment) {
      return res.status(404).json({ success: false, message: "Payment not found" });
    }

    res.status(200).json({ success: true, message: "Payment rejected", payment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};