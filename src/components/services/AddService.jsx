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
    <div className="bg-[#8ECAE6] min-h-screen py-16 px-4 flex items-center justify-center">
      <div
        className="w-full max-w-3xl mx-auto p-8 bg-white/30 backdrop-blur-xl shadow-2xl rounded-3xl border border-[#219EBC] animate-fade-in-down"
      >
        <h2 className="text-4xl font-bold text-center text-[#023047] mb-10">
          🚀 Add a New Service
        </h2>

        <form
          onSubmit={handleAddService}
          className="grid grid-cols-1 gap-6"
        >
          {[
            { name: 'image', type: 'text', placeholder: 'Image URL' },
            { name: 'title', type: 'text', placeholder: 'Service Title' },
            { name: 'company', type: 'text', placeholder: 'Company Name' },
            { name: 'website', type: 'url', placeholder: 'Website URL' },
            { name: 'category', type: 'text', placeholder: 'Category' },
            { name: 'price', type: 'number', placeholder: 'Price (BDT)' },
          ].map(({ name, type, placeholder }) => (
            <input
              key={name}
              name={name}
              type={type}
              placeholder={placeholder}
              required
              className="input input-bordered w-full bg-white/60 text-[#023047] placeholder:text-[#023047]/70 focus:outline-none focus:ring-2 focus:ring-[#219EBC] transition"
            />
          ))}

          <textarea
            name="description"
            placeholder="Service Description"
            rows="4"
            required
            className="textarea textarea-bordered w-full bg-white/60 text-[#023047] placeholder:text-[#023047]/70 focus:outline-none focus:ring-2 focus:ring-[#219EBC] transition"
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className="btn text-lg font-semibold bg-gradient-to-r from-[#023047] to-[#03557d] hover:from-[#03557d] hover:to-[#023047] text-white w-full py-3 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            {loading && (
              <span className="loading loading-spinner loading-sm text-white"></span>
            )}
            {loading ? 'Adding...' : 'Add Service'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddService;
