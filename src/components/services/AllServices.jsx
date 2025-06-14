import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

const AllServices = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/services') 
      .then(res => res.json())
      .then(data => setServices(data));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold text-center mb-10 text-[#023047]">🛠 All Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map(service => (
          <div key={service._id} className="bg-white shadow-lg rounded-xl overflow-hidden hover:scale-[1.02] transition-transform duration-300">
            <img src={service.image} alt={service.title} className="h-48 w-full object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-bold text-[#023047]">{service.title}</h3>
              <p className="text-gray-600">{service.description.slice(0, 80)}...</p>
              <p className="text-sm text-[#219EBC] font-medium">Category: {service.category}</p>
              <p className="text-lg font-semibold text-[#FB8500] mt-2">৳ {service.price}</p>
              <Link to={`/services/${service._id}`}>
                <button className="mt-4 btn bg-[#8ECAE6] hover:bg-[#219EBC] text-[#023047] w-full">
                  See Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllServices;
