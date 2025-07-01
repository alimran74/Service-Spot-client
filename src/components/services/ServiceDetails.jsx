
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { AuthContext } from '../../context/AuthContext'; 
import { toast } from 'react-toastify';
import Rating from 'react-rating';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';


const ServiceDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [service, setService] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [textReview, setTextReview] = useState('');
  const [rating, setRating] = useState(0);

  // Fetch service data
  useEffect(() => {
    axios.get(`https://service-spot-server-beta.vercel.app/services/${id}`)
    .then(res => setService(res.data))
    .catch(err => console.error('Service fetch error:', err));

    axios.get(`https://service-spot-server-beta.vercel.app/reviews/${id}`)
    .then(res => setReviews(res.data))
    .catch(err => console.error('Reviews fetch error:', err));
}, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!user) return toast.error("You must be logged in to submit a review");

    const reviewData = {
      serviceId: id,
      text: textReview,
      rating,
      name: user.displayName,
      photo: user.photoURL,
      date: new Date().toISOString(),
      email: user.email,
    };

    const res = await fetch('https://service-spot-server-beta.vercel.app/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewData),
    });

    const result = await res.json();

    if (result.insertedId || result.acknowledged) {
      toast.success("Review submitted successfully!");
      setReviews([reviewData, ...reviews]);
      setTextReview('');
      setRating(0);
    } else {
      toast.error("Failed to submit review");
    }
  };

  if (!service) return <p className="text-center mt-20">Loading service...</p>;

  const { image, title, description, price, company, category, addedDate, website } = service;

  return (
    <div className="min-h-screen bg-[#8ECAE6] py-12 px-4">
      <Helmet>
              <title>ServiceSpot | ServiceDetails</title>
              <meta name="description" content="Book trusted professionals for cleaning, plumbing, repairs & more with ServiceSpot." />
              <meta name="keywords" content="cleaning services, home repair, plumbing, electrician, ServiceSpot" />
              <link rel="canonical" href="https://service-spot-2f7aa.web.app/" />
            </Helmet>
      {/* Service Info */}
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl p-8">
        <img src={image} alt={title} className="w-full h-64 object-cover rounded-lg mb-6" />
        <h2 className="text-3xl font-bold text-[#023047] mb-4">{title}</h2>
        <p className="text-gray-700 mb-4">{description}</p>
        <div className="space-y-2 text-[#333]">
          <p><strong>Company:</strong> {company}</p>
          <p><strong>Category:</strong> {category}</p>
          <p><strong>Create Date:</strong> {new Date(addedDate).toLocaleDateString()}</p>
          <p>
            <strong>Website:</strong>{" "}
            <a href={website} target="_blank" rel="noreferrer" className="text-blue-600 underline">{website}</a>
          </p>
          <p className="text-xl font-bold text-[#FB8500] mt-4">৳ {price} BDT</p>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-2xl font-bold mb-4">💬 {reviews.length} Review(s)</h3>

        {reviews.length === 0 && (
          <p className="text-gray-500">No reviews yet. Be the first to review!</p>
        )}

        {reviews.map((r, i) => (
          <div key={i} className="border-b py-4">
            <div className="flex items-center gap-3 mb-1">
              <img src={r.photo} alt="user" className="w-10 h-10 rounded-full" />
              <div>
                <p className="font-semibold">{r.name}</p>
                <p className="text-sm text-gray-500">{new Date(r.date).toLocaleString()}</p>
              </div>
            </div>
            <p className="text-gray-700">{r.text}</p>
            <Rating
              initialRating={r.rating}
              readonly
              emptySymbol={<FaRegStar className="text-yellow-400" />}
              fullSymbol={<FaStar className="text-yellow-400" />}
            />
          </div>
        ))}
      </div>

      {/* Add Review Form */}
      {user && (
        <div className="max-w-4xl mx-auto mt-8 bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold mb-4">📝 Add Your Review</h3>
          <form onSubmit={handleReviewSubmit}>
            <textarea
              rows="4"
              className="w-full border p-3 rounded mb-3"
              placeholder="Write your review..."
              value={textReview}
              onChange={(e) => setTextReview(e.target.value)}
              required
            />
            <div className="mb-3">
              <span className="mr-3 font-medium">Rating:</span>
              <Rating
                initialRating={rating}
                emptySymbol={<FaRegStar className="text-yellow-400 text-2xl" />}
                fullSymbol={<FaStar className="text-yellow-400 text-2xl" />}
                onChange={setRating}
              />
            </div>
            <button
              type="submit"
              className="btn bg-[#023047] hover:bg-[#FB8500] text-white px-6 py-2 rounded-lg"
            >
              Submit Review
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ServiceDetails;

