import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";

const MyServices = () => {
  const { user } = useContext(AuthContext);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  // Fetch services created by current user
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/services?email=${user.email}`)
        .then((res) => setServices(res.data))
        .catch((err) => console.error(err));
    }
  }, [user]);

  // Delete service
  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure you want to delete this service?");
    if (!confirm) return;

    axios
      .delete(`http://localhost:5000/services/${id}`)
      .then((res) => {
        if (res.data.deletedCount > 0) {
          toast.success("Service deleted!");
          setServices(services.filter((s) => s._id !== id));
        }
      })
      .catch(() => toast.error("Delete failed"));
  };

  // Open update modal
  const openUpdateModal = (service) => {
    setSelectedService(service);
    setUpdatedData(service);
    setIsUpdateModalOpen(true);
  };

  // Update service
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

      // Check modifiedCount inside result or direct response
      const modifiedCount =
        res.data.modifiedCount ?? res.data.result?.modifiedCount ?? 0;

      if (modifiedCount > 0) {
        toast.success("Service updated!");
        setIsUpdateModalOpen(false);

        // Update local services state
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
    <div className="p-6 min-h-screen bg-[#4598e6]">
      <h2 className="text-2xl font-bold mb-6">My Services ({services.length})</h2>

      <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
        <table className="table w-full">
          <thead className="bg-[#219EBC] text-white">
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Category</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((s) => (
              <tr key={s._id}>
                <td>{s.title}</td>
                <td>৳ {s.price}</td>
                <td>{s.category}</td>
                <td>{new Date(s.addedDate).toLocaleDateString()}</td>
                <td className="flex gap-2">
                  <button
                    onClick={() => openUpdateModal(s)}
                    className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(s._id)}
                    className="btn btn-sm bg-red-500 hover:bg-red-600 text-white"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Modal */}
      {isUpdateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <form
            onSubmit={handleUpdate}
            className="bg-white p-6 rounded-lg w-[90%] md:w-[500px] shadow-xl"
          >
            <h3 className="text-xl font-bold mb-4">Update Service</h3>

            <input
              type="text"
              className="input input-bordered w-full mb-3"
              placeholder="Title"
              value={updatedData.title || ""}
              onChange={(e) => setUpdatedData({ ...updatedData, title: e.target.value })}
              required
            />

            <input
              type="text"
              className="input input-bordered w-full mb-3"
              placeholder="Price"
              value={updatedData.price || ""}
              onChange={(e) => setUpdatedData({ ...updatedData, price: e.target.value })}
              required
            />

            <input
              type="text"
              className="input input-bordered w-full mb-3"
              placeholder="Category"
              value={updatedData.category || ""}
              onChange={(e) => setUpdatedData({ ...updatedData, category: e.target.value })}
              required
            />

            <div className="flex justify-between mt-4">
              <button
                type="submit"
                className="btn bg-green-600 text-white hover:bg-green-700"
              >
                Update
              </button>
              <button
                type="button"
                className="btn bg-gray-400 text-white"
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
