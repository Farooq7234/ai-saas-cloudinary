'use client'
import React from 'react';
import { Check, Crown, Zap, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PricingSection = () => {
    const {toast} = useToast()
  const plans = [
    {
      name: 'Free',
      price: '₹0',
      period: 'forever',
      description: 'Perfect for getting started with basic features',
      features: [
        '6 Videos Compression',
        '6 PDFs Compression',
        'Unlimited Smart Image Crop',
        'Community support',
        'Standard export formats',

      ],
      buttonText: 'Get Started Free',
      popular: false,
      icon: Star
    },
    {
      name: 'Pro',
      price: '₹99',
      period: 'Lifetime',
      description: 'Advanced features for growing businesses',
      features: [
        'Unlimited Videos Compression',
        'Unlimited PDFs Compression',
        'Unlimited Smart Image Crop',
        'Priority support 24/7',
        '10GB storage space',
        'Email support'
      ],
      buttonText: 'Get Started',
      popular: true,
      icon: Zap
    }
  ];

  return (
    <div className="min-h-screen py-20 bg-black relative overflow-hidden">
      {/* Improved background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-indigo-600/8 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-purple-600/5 to-transparent rounded-full blur-2xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-purple-500/20 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 backdrop-blur-sm mb-8">
            <span className="text-sm font-semibold text-purple-300 uppercase tracking-wider">
              Pricing Plans
            </span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            Choose Your
            <span className="block bg-gradient-to-r from-purple-400 via-purple-300 to-indigo-400 bg-clip-text text-transparent">
              Perfect Plan
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Start free and scale as you grow. All plans include our core features 
            with premium options for advanced users.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            
            return (
              <div
                key={plan.name}
                className={`relative group transition-all duration-500 ${
                  plan.popular ? 'lg:scale-105' : ''
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="flex items-center gap-2 px-6 py-2 bg-gradient-to-b from-[#190d2e] to-[#4a208a] shadow-[0px_0px_12px_#8c45ff] rounded-md">
                      <Crown className="w-4 h-4" />
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Card */}
                <div
                  className={`relative rounded-3xl p-8 lg:p-10 border transition-all duration-500 group-hover:scale-[1.02] ${
                    plan.popular
                      ? 'border-purple-500/30 bg-gradient-to-br from-purple-900/20 via-black to-indigo-900/20 shadow-2xl shadow-purple-500/20'
                      : 'border-gray-700/50 bg-gradient-to-br from-gray-900/50 via-black to-gray-800/30 shadow-xl shadow-black/20 hover:border-gray-600/50'
                  }`}
                  style={{
                    background: plan.popular 
                      ? 'linear-gradient(135deg, rgba(139, 69, 244, 0.15) 0%, rgba(0, 0, 0, 0.8) 50%, rgba(79, 70, 229, 0.1) 100%)'
                      : 'linear-gradient(135deg, rgba(55, 65, 81, 0.3) 0%, rgba(0, 0, 0, 0.7) 50%, rgba(31, 41, 55, 0.2) 100%)'
                  }}
                >
                  {/* Subtle glow effect for Pro */}
                  {plan.popular && (
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-600/5 to-indigo-600/5 pointer-events-none"></div>
                  )}

                  <div className="relative z-10">
                    {/* Plan Header */}
                    <div className="text-center mb-8">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 ${
                        plan.popular 
                          ? 'bg-gradient-to-b from-[#190d2e] to-[#4a208a] shadow-[0px_0px_12px_#8c45ff]' 
                          : 'bg-gradient-to-r from-gray-600 to-gray-700 shadow-lg shadow-gray-500/25'
                      }`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      
                      <h3 className="text-2xl font-bold text-white mb-4">
                        {plan.name}
                      </h3>
                      
                      <div className="mb-4">
                        <span className={`text-5xl font-bold ${
                          plan.popular 
                            ? 'bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent' 
                            : 'text-white'
                        }`}>
                          {plan.price}
                        </span>
                        <span className="text-gray-400 ml-2 text-lg font-medium">
                          {plan.period}
                        </span>
                      </div>
                      
                      <p className="text-gray-300 text-base leading-relaxed max-w-sm mx-auto">
                        {plan.description}
                      </p>
                    </div>

                    {/* Features List */}
                    <div className="space-y-4 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start gap-3">
                          <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                            plan.popular 
                              ? 'bg-gradient-to-r from-purple-500 to-indigo-500' 
                              : 'bg-gradient-to-r from-gray-500 to-gray-600'
                          }`}>
                            <Check className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-gray-200 text-base leading-relaxed">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <button
                    onClick={()=>toast({title:"Login to access this feature",variant:"default"})}
                      className={`w-full py-4 px-6 rounded-2xl font-semibold text-base transition-all duration-300 transform hover:-translate-y-1 active:scale-95 ${
                        plan.popular
                          ? 'bg-gradient-to-b from-[#190d2e] to-[#4a208a] shadow-[0px_0px_12px_#8c45ff]'
                          : 'bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white backdrop-blur-sm'
                      }`}
                    >
                      {plan.buttonText}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-3 text-gray-400 bg-white/5 backdrop-blur-sm px-8 py-4 rounded-full border border-white/10">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="font-medium">
              14-day free trial • No credit card required • Cancel anytime
            </span>
          </div>
          
          <p className="text-gray-500 text-sm mt-6">
            Trusted by 50,000+ users worldwide
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;