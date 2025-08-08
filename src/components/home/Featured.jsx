import React, { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Featured = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [services, setServices] = useState([]);

  useEffect(() => {
    axios
      .get("https://service-spot-server-beta.vercel.app/services/featured")
      .then((res) => setServices(res.data))
      .catch((err) => console.error("Error fetching featured services:", err));
  }, []);

  return (
    <div className="mx-auto px-4 md:pt-20 bg-[#8ECAE6]">
      <h2 className="text-3xl font-bold text-center mb-10 text-[#023047]">
        🔥 Featured Services 🚀
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {services.map((service) => (
          <div
            key={service._id}
            className="bg-white shadow-md rounded-xl overflow-hidden border hover:scale-[1.03] transition-transform duration-300"
          >
            <img
              src={`https://res.cloudinary.com/dhcpuspks/image/fetch/q_auto,f_auto,w_800/${service.image}`}
              alt={service.title}
              onError={(e) => {
                e.currentTarget.onerror = null; // prevent infinite loop
                e.currentTarget.src = "/fallback-image.jpg"; // path relative to public folder
              }}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-[#023047]">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-2">
                {service.description.slice(0, 100)}...
              </p>
              <p className="text-lg font-bold text-[#219EBC]">
                ৳ {service.price}
              </p>
              <button
                onClick={() => {
                  if (!user) {
                    toast.warning("🛑 Please login to view details!");
                  } else {
                    navigate(`/services/${service._id}`);
                  }
                }}
                className="mt-4 btn bg-[#023047] hover:bg-[#FFB703] text-white w-full transition duration-300"
                style={{
                  boxShadow: "0 0 0px transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 12px 3px #FFB703";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 0px transparent";
                }}
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

export default Featured;
