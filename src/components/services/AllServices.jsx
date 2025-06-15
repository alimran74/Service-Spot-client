import React, { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, useLocation } from "react-router";
import { toast } from "react-toastify";
import { debounce } from "lodash";

const AllServices = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [services, setServices] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("All");
  const [categories, setCategories] = useState([]);
  const dropdownRef = useRef(null);

  // Fetch categories
  useEffect(() => {
    axios
      .get("http://localhost:5000/categories")
      .then((res) => setCategories(["All", ...res.data]))
      .catch((err) => console.error("Category fetch error:", err));
  }, []);

  // Fetch services
  const fetchServices = async (search = "", selectedCategory = "All") => {
    try {
      const queryParams = new URLSearchParams();
      if (search) queryParams.append("search", search);
      if (selectedCategory && selectedCategory !== "All") {
        queryParams.append("category", selectedCategory);
      }

      const res = await axios.get(`http://localhost:5000/services?${queryParams.toString()}`);
      setServices(res.data);
    } catch (err) {
      console.error("Service fetch error:", err);
    }
  };

  // Debounced search + filter
  const debouncedSearch = debounce((s, c) => fetchServices(s, c), 400);

  // Initial fetch
  useEffect(() => {
    fetchServices();
  }, []);

  // Trigger on search/category change
  useEffect(() => {
    debouncedSearch(searchText, category);
    return () => debouncedSearch.cancel();
  }, [searchText, category]);

  // Watch for back/forward navigation — show all if user comes back
  useEffect(() => {
    if (location.action === "POP") {
      setSearchText("");
      setCategory("All");
      fetchServices();
    }
  }, [location]);

  return (
    <div className="bg-[#8ECAE6] px-4 py-12 min-h-screen">
      <h2 className="text-4xl font-bold text-center mb-6 text-[#023047]">🛠 All Services</h2>

      {/* Search + Filter */}
      <div className="flex flex-col items-center gap-4 mb-10 px-2">
        {/* Search Box */}
        <div className="relative w-full max-w-md container">
          <input
            type="text"
            required
            className="input w-full"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <span className="label">
            <strong>Search Here</strong>
          </span>
        </div>

        {/* Category Dropdown */}
        <select
  ref={dropdownRef}
  className="w-full max-w-md px-4 py-2 rounded-md text-[#023047] font-medium 
             bg-transparent backdrop-blur-lg border border-[#219EBC] 
             focus:outline-none focus:ring-2 focus:ring-[#219EBC] transition duration-200"
  value={category}
  onChange={(e) => setCategory(e.target.value)}
>
  {categories.map((cat, idx) => (
    <option
      key={idx}
      value={cat}
      className="bg-[#ffffff20] backdrop-blur-md text-[#023047]"
    >
      {cat}
    </option>
  ))}
</select>

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
                <h3 className="text-xl font-bold text-[#023047] mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-1">
                  {service.description?.slice(0, 80)}...
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

      {/* Styles */}
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
          color:#023047;
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

        @media screen and (max-width: 640px) {
          select {
            font-size: 16px;
            padding: 10px;
          }
        }
        `}
      </style>
    </div>
  );
};

export default AllServices;



