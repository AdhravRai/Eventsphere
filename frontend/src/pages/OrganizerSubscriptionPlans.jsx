import { useNavigate } from "react-router-dom";

function OrganizerSubscriptionPlans() {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Free",
      price: 0,
      tag: null,
      color: "from-slate-700 to-slate-800",
      border: "border-slate-700",
      features: [
        "Host up to 2 events per semester",
        "Basic event analytics",
        "Standard attendee list export",
        "Email support",
      ],
    },
    {
      name: "Gold",
      price: 999,
      tag: "Most Popular",
      color: "from-yellow-600 to-amber-700",
      border: "border-yellow-500",
      features: [
        "Unlimited event hosting",
        "Advanced analytics & attendance insights",
        "Priority event approval queue",
        "Custom certificate branding",
        "Priority email & chat support",
      ],
    },
    {
      name: "Premium",
      price: 1999,
      tag: "Best Value",
      color: "from-purple-600 to-indigo-700",
      border: "border-purple-500",
      features: [
        "Everything in Gold, plus:",
        "Dedicated account manager",
        "Featured placement on event listings",
        "Bulk certificate generation tools",
        "API access for custom integrations",
      ],
    },
  ];

  const handleSelect = (plan) => {
    if (plan.price === 0) {
      navigate("/organizer-dashboard");
      return;
    }

    navigate("/subscription/payment", {
      state: { planName: plan.name, amount: plan.price },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white px-6 py-16">
      <div className="max-w-5xl mx-auto text-center mb-14">
        <h1 className="text-5xl font-bold mb-4">Organizer Plans</h1>
        <p className="text-slate-400 text-lg">
          Choose a plan to start hosting and managing events on EventSphere.
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
          onClick={() => navigate("/organizer-dashboard")}
          className="text-slate-500 hover:text-slate-300 transition"
        >
          Skip for now →
        </button>
      </div>
    </div>
  );
}

export default OrganizerSubscriptionPlans;