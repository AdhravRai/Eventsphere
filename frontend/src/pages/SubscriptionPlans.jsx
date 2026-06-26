import { useNavigate } from "react-router-dom";

function SubscriptionPlans() {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Free Trial",
      price: 0,
      tag: null,
      color: "from-slate-700 to-slate-800",
      border: "border-slate-700",
      features: [
        "Register for up to 3 events per semester",
        "Basic event browsing",
        "Standard attendance marking",
        "Digital certificate on completion",
      ],
    },
    {
      name: "Gold",
      price: 100,
      tag: "Most Popular",
      color: "from-yellow-600 to-amber-700",
      border: "border-yellow-500",
      features: [
        "Unlimited event registrations",
        "Priority registration (before slots fill)",
        "Early access to new event announcements",
        "Gold member badge on profile & certificates",
        "Email reminders before events",
      ],
    },
    {
      name: "Premium",
      price: 199,
      tag: "Best Value",
      color: "from-purple-600 to-indigo-700",
      border: "border-purple-500",
      features: [
        "Everything in Gold, plus:",
        "Free entry to 2 paid workshops per semester",
        "Premium member badge & certificate styling",
        "Direct access to organizer support",
        "Early-bird discount on future fests",
      ],
    },
  ];

  const handleSelect = (plan) => {
    if (plan.price === 0) {
      navigate("/student-dashboard");
      return;
    }

    navigate("/subscription/payment", {
      state: { planName: plan.name, amount: plan.price },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white px-6 py-16">
      <div className="max-w-5xl mx-auto text-center mb-14">
        <h1 className="text-5xl font-bold mb-4">Choose Your Plan</h1>
        <p className="text-slate-400 text-lg">
          Unlock more from EventSphere — pick the plan that fits you best.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative bg-slate-900/60 backdrop-blur-xl border ${plan.border} rounded-3xl p-8 flex flex-col hover:-translate-y-2 transition-all duration-300`}
          >
            {plan.tag && (
              <span className="absolute -top-3 right-6 bg-gradient-to-r from-yellow-500 to-amber-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                {plan.tag}
              </span>
            )}

            <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>

            <div className="mb-6">
              <span className="text-5xl font-extrabold">₹{plan.price}</span>
              <span className="text-slate-400 ml-2">/ semester</span>
            </div>

            <ul className="space-y-3 mb-10 flex-1">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-300">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleSelect(plan)}
              className={`w-full py-3 rounded-xl font-semibold bg-gradient-to-r ${plan.color} hover:scale-[1.02] transition`}
            >
              {plan.price === 0 ? "Continue with Free" : `Get ${plan.name}`}
            </button>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <button
          onClick={() => navigate("/student-dashboard")}
          className="text-slate-500 hover:text-slate-300 transition"
        >
          Skip for now →
        </button>
      </div>
    </div>
  );
}

export default SubscriptionPlans;