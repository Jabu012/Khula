
import React from 'react';
import { SubscriptionTier } from '../types';

interface PricingTiersProps {
  onSelect: (tier: SubscriptionTier) => void;
}

const PricingTiers: React.FC<PricingTiersProps> = ({ onSelect }) => {
  const plans = [
    {
      name: SubscriptionTier.FREE,
      price: "$0",
      features: [
        "Upload up to 1 PDF (max 50 pages)",
        "Limited daily chat (15 questions)",
        "Basic quiz generation (5 per session)",
        "Text-only AI assistant",
        "Basic performance tracking"
      ],
      button: "Current Plan",
      highlight: false,
      disabled: true
    },
    {
      name: SubscriptionTier.PRO,
      price: "$15",
      period: "/month",
      features: [
        "Unlimited PDF uploads",
        "Larger document limits (250+ pages)",
        "Unlimited Chat & Voice interaction",
        "Smart Exam Mode",
        "Full Performance Analytics",
        "Priority AI processing"
      ],
      button: "Upgrade to Pro",
      highlight: true
    },
    {
      name: SubscriptionTier.PRO_PLUS,
      price: "$35",
      period: "/month",
      features: [
        "Everything in Pro",
        "Full AI Avatar Experience",
        "Guided Learning Mode",
        "Emotion-aware personal tutor",
        "Advanced exam simulations",
        "Structured lesson walkthroughs"
      ],
      button: "Go Pro+",
      highlight: false
    },
    {
      name: SubscriptionTier.INSTITUTION,
      price: "Custom",
      features: [
        "Unlimited Users (Bulk licenses)",
        "Centralized document repository",
        "Teacher Dashboard & Analytics",
        "Custom avatar branding",
        "API access for LMS integration",
        "Dedicated account manager"
      ],
      button: "Contact Sales",
      highlight: false
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-5xl font-black tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Power Your Academic Journey</h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">Choose the plan that fits your study load and curriculum goals.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <div 
            key={plan.name}
            className={`
              relative flex flex-col p-8 rounded-[2rem] transition-all duration-300 hover:scale-[1.02]
              ${plan.highlight 
                ? 'bg-indigo-600 shadow-[0_20px_50px_rgba(79,70,229,0.3)] ring-4 ring-indigo-400/20' 
                : 'bg-slate-900 border border-slate-800'}
            `}
          >
            {plan.highlight && (
              <span className="absolute top-0 right-8 -translate-y-1/2 bg-emerald-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                Student Choice
              </span>
            )}
            <div className="mb-8">
              <h3 className="text-lg font-bold mb-2 opacity-80">{plan.name}</h3>
              <div className="flex items-baseline">
                <span className="text-4xl font-black">{plan.price}</span>
                <span className="text-slate-400 ml-1 text-sm">{plan.period}</span>
              </div>
            </div>

            <ul className="flex-1 space-y-4 mb-8">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start text-[13px] leading-tight">
                  <svg className={`w-4 h-4 mr-2.5 mt-0.5 flex-shrink-0 ${plan.highlight ? 'text-indigo-200' : 'text-indigo-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                  <span className={plan.highlight ? 'text-indigo-100' : 'text-slate-300'}>{feature}</span>
                </li>
              ))}
            </ul>

            <button 
              disabled={plan.disabled}
              onClick={() => onSelect(plan.name as SubscriptionTier)}
              className={`
                w-full py-4 rounded-2xl font-black text-sm uppercase tracking-wider transition-all
                ${plan.highlight 
                  ? 'bg-white text-indigo-600 hover:bg-slate-100' 
                  : plan.disabled ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-slate-800 text-white hover:bg-slate-700'}
              `}
            >
              {plan.button}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingTiers;