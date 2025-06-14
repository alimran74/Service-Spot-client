import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const AddService = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleAddService = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const service = {
      image: form.image.value,
      title: form.title.value,
      company: form.company.value,
      website: form.website.value,
      description: form.description.value,
      category: form.category.value,
      price: parseFloat(form.price.value),
      addedDate: new Date().toISOString(),
      userEmail: user.email,
    };

    try {
      const res = await fetch('http://localhost:5000/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(service),
      });

      const result = await res.json();
      if (result.insertedId) {
        toast.success('✅ Service added successfully!');
        form.reset();
      } else {
        toast.error('❌ Failed to add service.');
      }
    } catch (error) {
      toast.error('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#8ECAE6] min-h-screen py-10 px-4">
      <div className="max-w-3xl mx-auto p-8 bg-[#219EBC] shadow-xl rounded-2xl transform transition-transform duration-300 hover:scale-105">
        <h2 className="text-3xl font-extrabold text-center mb-8 text-[#023047]">
          Add a New Service
        </h2>
        <form
          onSubmit={handleAddService}
          className="grid grid-cols-1 gap-6"
        >
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            name="title"
            placeholder="Service Title"
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            name="company"
            placeholder="Company Name"
            className="input input-bordered w-full"
            required
          />
          <input
            type="url"
            name="website"
            placeholder="Website URL"
            className="input input-bordered w-full"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            className="textarea textarea-bordered w-full"
            rows="4"
            required
          ></textarea>
          <input
            type="text"
            name="category"
            placeholder="Category"
            className="input input-bordered w-full"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price (BDT)"
            className="input input-bordered w-full"
            required
          />
          <button
            type="submit"
            className="btn bg-[#023047] hover:bg-[#03557d] text-white w-full text-lg font-semibold py-2 rounded-lg shadow-md transition-all duration-300"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Service'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddService;
