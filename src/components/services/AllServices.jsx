import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext'; // adjust path if needed
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';


const AllServices = () => {
    const { user } = useContext(AuthContext);
const navigate = useNavigate();

  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/services') 
      .then(res => res.json())
      .then(data => setServices(data));
  }, []);

  return (
    <div className=" mx-auto px-4 py-12 bg-[#8ECAE6]">
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
              <button
  onClick={() => {
    if (!user) {
      toast.warning('🛑 Please login to view details!');
    } else {
      navigate(`/services/${service._id}`);
    }
  }}
  className="mt-4 btn bg-[#023047] hover:bg-[#FFB703] text-white w-full"
>
  See Details
</button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllServices;
