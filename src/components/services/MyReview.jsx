import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const MyReview = () => {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [editingReview, setEditingReview] = useState(null);

  useEffect(() => {
    if (user?.email) {
      // 1. Fetch reviews for the user
      axios
        .get(`http://localhost:5000/reviews?email=${user.email}`)
        .then(async (res) => {
          const reviewsWithServices = await Promise.all(
            res.data.map(async (review) => {
              // 2. For each review, fetch the corresponding service
              try {
                const serviceRes = await axios.get(
                  `http://localhost:5000/services/${review.serviceId}`
                );
                return {
                  ...review,
                  serviceTitle: serviceRes.data.title || "No Title",
                  serviceCategory: serviceRes.data.category || "No Category",
                };
              } catch (err) {
                // If service fetch fails, fallback gracefully
                return {
                  ...review,
                  serviceTitle: "Service not found",
                  serviceCategory: "Unknown",
                };
              }
            })
          );
          // 3. Save the enriched reviews with service data
          setReviews(reviewsWithServices);
        })
        .catch(() => toast.error("Failed to fetch reviews"));
    }
  }, [user]);

  // rest of your existing handlers unchanged
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this review?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/reviews/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            toast.success("Review deleted");
            setReviews(reviews.filter((r) => r._id !== id));
          } else {
            toast.error("Failed to delete");
          }
        });
      }
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:5000/reviews/${editingReview._id}`,
        editingReview
      );
      if (res.data.modifiedCount > 0 || res.data.result?.modifiedCount > 0) {
        toast.success("Review updated");
        setReviews((prev) =>
          prev.map((r) =>
            r._id === editingReview._id ? editingReview : r
          )
        );
        setEditingReview(null);
      } else {
        toast.info("No changes made");
      }
    } catch (err) {
      toast.error("Update failed");
    }
  };

  return (
    <div className="p-6 bg-[#8ECAE6] min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-6 text-[#023047]">
        My Reviews ({reviews.length})
      </h2>

      <div className="grid gap-4">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="bg-white p-4 rounded-lg shadow-md border"
          >
            {/* Use the enriched serviceTitle and serviceCategory */}
            <h3 className="text-xl font-semibold text-[#219EBC] mb-2">
              {review.serviceTitle} ({review.serviceCategory})
            </h3>
            <p className="mb-2">{review.text}</p>
            <p className="mb-2 text-yellow-600">
              Rating: {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setEditingReview(review)}
                className="btn btn-sm bg-[#219EBC] text-white px-4 py-2 rounded-lg shadow-md 
             hover:bg-[#126782] hover:shadow-xl hover:scale-105 transition-all duration-300 
             flex items-center gap-2"
              >
                <FaEdit className="text-white" />
                <span className="font-medium">Update</span>
              </button>

              <button
                onClick={() => handleDelete(review._id)}
                className="btn btn-sm bg-red-600 text-white hover:bg-red-700 px-3 flex items-center gap-1"
              >
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Update Modal */}
      {editingReview && (
        <div className="fixed inset-0 bg-[#8ECAE6] bg-opacity-40 flex justify-center items-center z-50 p-4">
          <form
            onSubmit={handleUpdate}
            className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl"
          >
            <h3 className="text-2xl font-bold text-[#023047] mb-4">
              Update Review
            </h3>

            <input
              type="text"
              value={editingReview.serviceTitle}
              readOnly
              className="input input-bordered w-full mb-4 bg-gray-200 text-gray-600"
            />

            <textarea
              rows="4"
              className="textarea textarea-bordered w-full mb-4"
              value={editingReview.text}
              onChange={(e) =>
                setEditingReview({ ...editingReview, text: e.target.value })
              }
              required
            />

            <div className="mb-4">
              <label className="font-semibold block mb-1">Rating:</label>
              <select
                value={editingReview.rating}
                onChange={(e) =>
                  setEditingReview({
                    ...editingReview,
                    rating: parseInt(e.target.value),
                  })
                }
                className="select select-bordered w-full"
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <option key={star} value={star}>
                    {star} Star{star > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                className="btn px-4 py-2 bg-[#219EBC] text-white rounded-md shadow hover:bg-[#395d68] hover:scale-105 transition-all duration-300"
              >
                Save Changes
              </button>

              <button
                type="button"
                onClick={() => setEditingReview(null)}
                className="btn px-4 py-2 bg-[#023047] text-white rounded-md shadow hover:text-red-600 hover:scale-105 transition-all duration-300"
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

export default MyReview;
