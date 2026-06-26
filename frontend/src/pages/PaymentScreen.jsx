import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";

function PaymentScreen() {
  const location = useLocation();
  const navigate = useNavigate();

  const { planName, amount } = location.state || { planName: "Gold", amount: 100 };

  const [transactionId, setTransactionId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!transactionId.trim()) {
      setError("Please enter your UPI transaction reference ID.");
      return;
    }

    setSubmitting(true);

    try {
      await api.post(
        "/payments",
        {
          type: "Subscription",
          plan: planName,
          amount,
          transactionId: transactionId.trim(),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSubmitted(true);
    } catch (err) {
      setError(
        err.response?.data?.message || "Could not submit payment. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white flex items-center justify-center px-4">
        <div className="max-w-md bg-slate-900/60 backdrop-blur-xl border border-green-600 rounded-3xl p-10 text-center">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-3xl font-bold mb-3">Payment Submitted</h1>
          <p className="text-slate-400 mb-8">
            Your <span className="text-white font-semibold">{planName}</span> subscription
            request has been received. Our team will verify your payment shortly and your
            plan will be activated.
          </p>
          <button
            onClick={() => navigate("/student-dashboard")}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-[1.02] transition font-semibold"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white flex items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8 bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-10">

        {/* Left: QR + amount */}
        <div className="flex flex-col items-center justify-center border-r border-slate-800 pr-8 md:pr-8">
          <h2 className="text-2xl font-bold mb-1">{planName} Subscription</h2>
          <p className="text-slate-400 mb-6">Scan to pay via any UPI app</p>

          <div className="bg-white p-4 rounded-2xl mb-6">
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=upi://pay?pa=demo@upi%26pn=EventSphere%26am=0"
              alt="UPI QR Code"
              className="w-56 h-56"
            />
          </div>

          <div className="text-center">
            <p className="text-slate-400 text-sm">Amount to pay</p>
            <p className="text-4xl font-extrabold">₹{amount}</p>
          </div>

          <p className="text-xs text-slate-500 mt-6 text-center max-w-xs">
            This is a demo QR for hackathon purposes. No real payment is processed.
          </p>
        </div>

        {/* Right: form */}
        <div className="flex flex-col justify-center">
          <h3 className="text-xl font-bold mb-4">Confirm Your Payment</h3>

          <p className="text-slate-400 mb-6 text-sm leading-relaxed">
            After scanning and paying, open your UPI app, find the transaction, and copy
            the <span className="text-white font-medium">UPI Reference / Transaction ID</span>.
            Paste it below to confirm — our admin team will verify it before activating
            your subscription.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-slate-300 mb-2 text-sm">
                UPI Transaction Reference ID
              </label>
              <input
                type="text"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                placeholder="e.g. 234567891234"
                className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-[1.02] transition font-semibold disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "I've Paid — Submit for Verification"}
            </button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full py-3 rounded-xl border border-slate-700 hover:bg-slate-800 transition text-slate-300"
            >
              Back to Plans
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PaymentScreen;