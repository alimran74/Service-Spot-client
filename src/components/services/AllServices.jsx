import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { debounce } from "lodash";

const AllServices = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [searchText, setSearchText] = useState("");

  const fetchServices = async (search = "") => {
    try {
      const res = await axios.get(`http://localhost:5000/services?search=${search}`);
      setServices(res.data);
    } catch (err) {
      console.error("Error fetching services:", err);
    }
  };

  const debouncedSearch = debounce((value) => {
    fetchServices(value);
  }, 400);

  useEffect(() => {
    fetchServices(); 
  }, []);

  useEffect(() => {
    debouncedSearch(searchText);
    return () => debouncedSearch.cancel(); // cleanup
  }, [searchText]);

  return (
    <div className="bg-[#8ECAE6] px-4 py-12 min-h-screen">
      <h2 className="text-4xl font-bold text-center mb-6 text-[#023047]">
        🛠 All Services
      </h2>

      {/* Search Input */}
      <div className="flex justify-center mb-10">
        <div className="relative w-full max-w-md container">
          <input
            type="text"
            required
            className="input w-full"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <span className="label"><strong>Search by name Category company</strong></span>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.length ? (
          services.map((service) => (
            <div
              key={service._id}
              className="bg-white shadow-lg rounded-xl overflow-hidden transform hover:scale-105 transition-transform duration-300"
            >
              <img
                src={service.image}
                alt={service.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold text-[#023047] mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-1">
                  {service.description.slice(0, 80)}...
                </p>
                <p className="text-sm text-[#219EBC] font-medium">
                  Category: {service.category}
                </p>
                <p className="text-lg font-semibold text-[#FB8500] mt-2">
                   {service.price} BDT
                </p>
                <button
                  onClick={() => {
                    if (!user) {
                      toast.warning("❌ Please login to view details!");
                    } else {
                      navigate(`/services/${service._id}`);
                    }
                  }}
                  className="mt-4 w-full py-2 rounded text-white bg-[#023047] hover:bg-[#FFB703] transition shadow-md"
                  style={{ boxShadow: "0 0 0px transparent" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.boxShadow = "0 0 12px 3px #FFB703")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.boxShadow = "0 0 0px transparent")
                  }
                >
                  See Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-[#023047] col-span-3">No services found</p>
        )}
      </div>

      {/* Animation CSS */}
      <style>
        {`
        .container {
          display: flex;
          flex-direction: column;
          gap: 7px;
          position: relative;
        }

        .container .label {
          font-size: 15px;
          padding-left: 10px;
          position: absolute;
          top: 13px;
          color: white;
          transition: 0.3s;
          pointer-events: none;
        }

        .input {
          width: 100%;
          height: 45px;
          border: none;
          outline: none;
          padding: 0px 10px;
          border-radius: 6px;
          font-size: 15px;
          background-color: transparent;
          color:[#023047];
          box-shadow: 3px 3px 10px rgba(0,0,0,1),
                      -1px -1px 6px rgba(255, 255, 255, 0.2);
        }

        .input:focus {
          border: 2px solid transparent;
          box-shadow: 3px 3px 10px rgba(0,0,0,1),
                      -1px -1px 6px rgba(255, 255, 255, 0.2),
                      inset 3px 3px 10px rgba(0,0,0,1),
                      inset -1px -1px 6px rgba(255, 255, 255, 0.3);
        }

        .input:valid ~ .label,
        .input:focus ~ .label {
          padding-left: 2px;
          transform: translateY(-35px);
          font-size: 13px;
          color: #023047;
        }
        `}
      </style>
    </div>
  );
};

export default AllServices;
