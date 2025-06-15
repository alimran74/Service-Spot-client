import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const MyServices = () => {
  const { user } = useContext(AuthContext);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/services?email=${user.email}`)
        .then((res) => setServices(res.data))
        .catch((err) => console.error(err));
    }
  }, [user]);

const handleDelete = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "This service will be permanently deleted!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .delete(`http://localhost:5000/services/${id}`)
        .then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Your service has been deleted.", "success");
            setServices((prev) => prev.filter((s) => s._id !== id));
          } else {
            toast.error("Delete failed");
          }
        })
        .catch(() => toast.error("Delete failed"));
    }
  });
};


  const openUpdateModal = (service) => {
    setSelectedService(service);
    setUpdatedData(service);
    setIsUpdateModalOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!selectedService?._id) {
      toast.error("Invalid service selected");
      return;
    }

    try {
      const res = await axios.put(
        `http://localhost:5000/services/${selectedService._id}`,
        updatedData
      );

      const modifiedCount =
        res.data.modifiedCount ?? res.data.result?.modifiedCount ?? 0;

      if (modifiedCount > 0) {
        toast.success("Service updated!");
        setIsUpdateModalOpen(false);
        setServices((prev) =>
          prev.map((s) => (s._id === selectedService._id ? { ...s, ...updatedData } : s))
        );
      } else {
        toast.info("No changes detected or update failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Update failed");
    }
  };

  return (
    <div className="p-6 min-h-screen bg-[#8ECAE6]">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-[#023047]">
        My Services ({services.length})
      </h2>

      {/* Responsive table container */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
        <table className="min-w-full border-collapse block md:table">
          <thead className="block md:table-header-group bg-[#219EBC] text-white sticky top-0 z-10">
            <tr className="block md:table-row">
              <th className="p-3 text-left font-semibold text-sm md:border md:border-white md:table-cell">
                Title
              </th>
              <th className="p-3 text-left font-semibold text-sm md:border md:border-white md:table-cell">
                Price
              </th>
              <th className="p-3 text-left font-semibold text-sm md:border md:border-white md:table-cell">
                Category
              </th>
              <th className="p-3 text-left font-semibold text-sm md:border md:border-white md:table-cell">
                Date
              </th>
              <th className="p-3 text-center font-semibold text-sm md:border md:border-white md:table-cell">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="block md:table-row-group">
            {services.map((s) => (
              <tr
                key={s._id}
                className="bg-white border mb-4 md:mb-0 md:border-none block md:table-row hover:bg-[#e0f2fe]"
              >
                <td className="p-3 text-left text-sm md:border md:border-gray-200 md:table-cell" data-label="Title">
                  {s.title}
                </td>
                <td className="p-3 text-left text-sm md:border md:border-gray-200 md:table-cell" data-label="Price">
                  ৳ {s.price}
                </td>
                <td className="p-3 text-left text-sm md:border md:border-gray-200 md:table-cell" data-label="Category">
                  {s.category}
                </td>
                <td className="p-3 text-left text-sm md:border md:border-gray-200 md:table-cell" data-label="Date">
                  {new Date(s.addedDate).toLocaleDateString()}
                </td>
                <td
                  className="p-3 text-center text-sm flex justify-center gap-2 md:border md:border-gray-200 md:table-cell"
                  data-label="Actions"
                >
                  <button
                    onClick={() => openUpdateModal(s)}
                    aria-label={`Edit ${s.title}`}
                    className="btn btn-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md px-3 py-1 flex items-center justify-center transition-colors duration-200"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(s._id)}
                    aria-label={`Delete ${s.title}`}
                    className="btn btn-sm bg-red-600 hover:bg-red-700 text-white rounded-md px-3 py-1 flex items-center justify-center transition-colors duration-200"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
            {services.length === 0 && (
              <tr className="block md:table-row">
                <td colSpan="5" className="p-4 text-center text-gray-600 md:table-cell">
                  No services found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

{/* Update Modal */}
{isUpdateModalOpen && (
  <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 p-4">
    <form
      onSubmit={handleUpdate}
      className="bg-white bg-opacity-95 backdrop-blur-sm p-6 rounded-lg w-full max-w-md shadow-xl"
    >
      <h3 className="text-2xl font-semibold mb-5 text-center text-[#023047]">
        Update Service
      </h3>

      <input
        type="text"
        className="input input-bordered w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#219EBC]"
        placeholder="Title"
        value={updatedData.title || ""}
        onChange={(e) => setUpdatedData({ ...updatedData, title: e.target.value })}
        required
      />

      <input
        type="number"
        min="0"
        className="input input-bordered w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#219EBC]"
        placeholder="Price"
        value={updatedData.price || ""}
        onChange={(e) => setUpdatedData({ ...updatedData, price: e.target.value })}
        required
      />

      <input
        type="text"
        className="input input-bordered w-full mb-6 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#219EBC]"
        placeholder="Category"
        value={updatedData.category || ""}
        onChange={(e) => setUpdatedData({ ...updatedData, category: e.target.value })}
        required
      />

      <div className="flex justify-between">
        <button
          type="submit"
          className="btn bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded-md font-semibold transition-colors duration-200"
        >
          Update
        </button>
        <button
          type="button"
          className="btn bg-gray-400 text-white px-4 py-2 rounded-md font-semibold"
          onClick={() => setIsUpdateModalOpen(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
)}

    </div>
  );
};

export default MyServices;
