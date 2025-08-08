import React, { useState, useEffect } from 'react';

const servicesDemoData = [
  { id: 1, title: 'Car Repair', category: 'Automotive', image: 'https://i.ibb.co/2dFNfNQ/car.png' },
  { id: 2, title: 'Home Cleaning', category: 'Cleaning', image: 'https://i.ibb.co/1ZnBLzD/cleaning.png' },
  { id: 3, title: 'Plumbing', category: 'Home Services', image: 'https://i.ibb.co/hfDx1Cv/plumbing.png' },
  { id: 4, title: 'Electrician', category: 'Home Services', image: 'https://i.ibb.co/yRmT5RF/electrician.png' },
  { id: 5, title: 'Gardening', category: 'Outdoor', image: 'https://i.ibb.co/4WSMMjc/gardening.png' },
  { id: 6, title: 'Dog Walking', category: 'Pet Care', image: 'https://i.ibb.co/2YbS1Qx/dog-walking.png' },
  { id: 7, title: 'Tutoring', category: 'Education', image: 'https://i.ibb.co/9qXJZkJ/tutoring.png' },
  { id: 8, title: 'Yoga Classes', category: 'Health & Wellness', image: 'https://i.ibb.co/1rn5QwD/yoga.png' },
  { id: 9, title: 'Web Development', category: 'IT Services', image: 'https://i.ibb.co/xj7vDKG/web-dev.png' },
  { id: 10, title: 'Photography', category: 'Creative', image: 'https://i.ibb.co/6Nw5dKn/photography.png' },
  { id: 11, title: 'Catering', category: 'Food Services', image: 'https://i.ibb.co/BjN8wFt/catering.png' },
  { id: 12, title: 'Personal Training', category: 'Health & Wellness', image: 'https://i.ibb.co/F6rvQk7/personal-training.png' },
];

// Add new categories from the new services (make sure "All" is first)
const categories = [
  'All',
  'Automotive',
  'Cleaning',
  'Home Services',
  'Outdoor',
  'Pet Care',
  'Education',
  'Health & Wellness',
  'IT Services',
  'Creative',
  'Food Services',
];

export default function InteractiveServiceFinder() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredServices, setFilteredServices] = useState(servicesDemoData);

  useEffect(() => {
    let filtered = servicesDemoData;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter((s) => s.category === selectedCategory);
    }
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter((s) =>
        s.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredServices(filtered);
  }, [searchTerm, selectedCategory]);

  return (
    <div className="bg-[#8ECAE6] px-4 ssm:px-6 lg:px-8 ">
      <section className=" mx-auto bg-[#8ECAE6] rounded-lg shadow-md p-6 sm:p-10">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-8 text-center text-gray-900">
          Try Our Service Finder Demo
        </h2>
        <div className="flex flex-col md:flex-row gap-4 justify-center mb-10 max-w-3xl mx-auto">
          <input
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-3 rounded border border-gray-300 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {filteredServices.length === 0 ? (
          <p className="text-center text-gray-700 text-lg">No services found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-[#219EBC] rounded-lg shadow-md hover:shadow-xl transition cursor-pointer flex flex-col"
              >
                <img
              src={`https://res.cloudinary.com/dhcpuspks/image/fetch/q_auto,f_auto,w_800/${service.image}`}
              alt={service.title}
              onError={(e) => {
                e.currentTarget.onerror = null; // prevent infinite loop
                e.currentTarget.src = "/fallback-image.jpg"; 
              }}
              className=" w-full rounded-t-lg object-cover"
            />
                <div className="p-4 flex-grow flex flex-col">
                  <h3 className="text-lg font-semibold mb-1">{service.title}</h3>
                  <p className="text-sm text-gray-500 flex-grow">{service.category}</p>
                 
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
