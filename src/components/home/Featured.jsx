import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

const Featured = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/services/featured')
      .then(res => res.json())
      .then(data => setServices(data));
  }, []);

  return (
    <div className=" mx-auto px-4 py-12 bg-[#8ECAE6]">
      <h2 className="text-3xl font-bold text-center mb-10 text-[#023047]">🔥 Featured Services🚀</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map(service => (
          <div key={service._id} className="bg-white shadow-md rounded-xl overflow-hidden hover:scale-[1.03] transition-transform duration-300">
            <img src={service.image} alt={service.title} className="h-48 w-full object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-[#023047]">{service.title}</h3>
              <p className="text-gray-600 mb-2">{service.description.slice(0, 100)}...</p>
              <p className="text-lg font-bold text-[#219EBC]">৳ {service.price}</p>
              <Link to={`/services/${service._id}`}>
                <button className="mt-4 btn bg-[#023047] hover:bg-[#FFB703] text-white font-semibold">
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

export default Featured;
