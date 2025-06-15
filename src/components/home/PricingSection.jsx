import React from 'react';

const PricingSection = () => {
  const plans = [
    {
      name: "Residential",
      price: 79,
      bg: "bg-white",
      features: [
        "Deep Cleaning",
        "Clean Inside The Fridge",
        "Move In Cleaning"
      ],
      icon: "https://cdn-icons-png.flaticon.com/512/3477/3477194.png",
      button: "bg-[#023047] text-white"
    },
    {
      name: "Premium",
      price: 99,
      bg: "bg-[#219EBC] text-white",
      features: [
        "Deep Cleaning",
        "Clean Inside The Fridge",
        "Move In Cleaning"
      ],
      icon: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png",
      button: "bg-white text-[#023047]"
    },
    {
      name: "Commercial",
      price: 299,
      bg: "bg-white",
      features: [
        "Deep Cleaning",
        "Clean Inside The Fridge",
        "Move In Cleaning"
      ],
      icon: "https://cdn-icons-png.flaticon.com/512/3188/3188583.png",
      button: "bg-[#023047] text-white"
    }
  ];

  return (
    <section className="bg-[#8ECAE6] py-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <p className="text-[#219EBC] uppercase font-semibold tracking-wide">Our Pricing</p>
        <h2 className="text-3xl md:text-4xl font-bold text-[#023047]">Prices for Our Services</h2>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className={`${plan.bg} shadow rounded-lg p-6 flex flex-col justify-between transform transition-transform duration-300 hover:scale-105 hover:shadow-lg`}


          >
            <div className="flex flex-col items-center text-center mb-6">
              <img src={plan.icon} alt={plan.name} className="h-16 w-16 mb-4" />
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <p className="text-3xl font-extrabold">${plan.price} <span className="text-base font-normal">Monthly</span></p>
            </div>
            <ul className="space-y-2 mb-6 text-[#023047]">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center justify-center gap-2">
                  <span className="text-[#FB8500] font-bold">✔</span> {feature}
                </li>
              ))}
            </ul>
            <button className={`w-full py-2 mt-auto font-semibold rounded ${plan.button} hover:bg-[#FFB703] transition`}>
              BUY NOW
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PricingSection;