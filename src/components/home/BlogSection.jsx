import React, { useState } from "react";
import { motion } from "framer-motion";

const blogPosts = [
  {
    id: 1,
    title: "5 Tips to Choose the Right Electrician",
    description:
      "Learn how to check qualifications, compare quotes, and ensure your home’s electrical safety.",
    content: `
Hiring the right electrician is crucial for both safety and efficiency.
Here are 5 important tips:

1. Check their license – Make sure they are certified and insured.
2. Ask for references – A good electrician will have past clients who can vouch for their work.
3. Get multiple quotes – Compare prices but don’t just choose the cheapest.
4. Check experience – Ensure they have worked on projects similar to yours.
5. Ask about guarantees – A reputable electrician will stand by their work.
    `,
    date: "Aug 5, 2025",
    author: "ServiceSpot Team",
  },
  {
    id: 2,
    title: "How to Maintain Your AC in Summer",
    description:
      "Simple maintenance habits that improve cooling efficiency and extend your AC’s lifespan.",
    content: `
A well-maintained AC saves money and keeps you cool:

1. Clean or replace filters every 1–2 months.
2. Check refrigerant levels to ensure efficiency.
3. Inspect ductwork for leaks.
4. Clear debris from around the outdoor unit.
5. Schedule professional servicing before peak summer.
    `,
    date: "Jul 28, 2025",
    author: "ServiceSpot Team",
  },
  {
    id: 3,
    title: "The Ultimate Guide to Home Plumbing Safety",
    description:
      "Prevent leaks, clogs, and water damage with these easy plumbing safety measures.",
    content: `
Plumbing safety can save you from costly repairs:

1. Know your main shut-off valve location.
2. Avoid chemical drain cleaners that damage pipes.
3. Insulate pipes in winter to prevent freezing.
4. Schedule yearly inspections to catch issues early.
5. Use strainers to prevent clogs in sinks and showers.
    `,
    date: "Jul 14, 2025",
    author: "ServiceSpot Team",
  },
  {
  id: 4,
  title: "10 House Cleaning Hacks for Busy People",
  description:
    "Quick cleaning tricks to keep your home fresh and tidy without spending hours.",
  content: `
Keeping your home clean doesn’t have to take all day. Try these hacks:

1. Use microfiber cloths for quick dusting.
2. Clean as you go to avoid big messes.
3. Use vinegar and baking soda for natural cleaning.
4. Organize clutter with baskets and bins.
5. Clean one room at a time to stay focused.
6. Use a squeegee to remove pet hair from carpets.
7. Microwave sponges for 2 minutes to disinfect.
8. Keep cleaning supplies in each bathroom.
9. Use old socks for blinds cleaning.
10. Set a timer for short cleaning bursts.
  `,
  date: "Jul 2, 2025",
  author: "ServiceSpot Team",
},

{
  id: 5,
  title: "When to Call a Professional Painter",
  description:
    "Know the signs that your DIY paint job might need a professional touch.",
  content: `
Painting your home can be tricky. Consider hiring a pro when:

1. You notice uneven paint or drips.
2. The walls have stains or mold.
3. You’re painting large or hard-to-reach areas.
4. You need special finishes or textures.
5. Time is limited and you want quality results.
6. You want expert advice on color choices.
  `,
  date: "Jun 21, 2025",
  author: "ServiceSpot Team",
},

{
  id: 6,
  title: "Seasonal Home Maintenance Checklist",
  description:
    "A step-by-step checklist to prepare your home for each season of the year.",
  content: `
Proper maintenance keeps your home safe and efficient:

**Spring:**
- Inspect roof and gutters.
- Service HVAC system.
- Clean windows and screens.

**Summer:**
- Check exterior paint.
- Inspect plumbing for leaks.
- Maintain lawn and garden.

**Fall:**
- Clean chimney.
- Winterize outdoor faucets.
- Check insulation.

**Winter:**
- Monitor for ice dams.
- Inspect basement for leaks.
- Test smoke and CO detectors.
  `,
  date: "Jun 10, 2025",
  author: "ServiceSpot Team",
},

{
  id: 7,
  title: "Pest Control Tips for a Healthy Home",
  description:
    "Effective, eco-friendly ways to keep pests away all year long.",
  content: `
Avoid pests without harsh chemicals:

1. Seal cracks and gaps around your home.
2. Keep food in airtight containers.
3. Remove standing water to prevent mosquitoes.
4. Use natural repellents like peppermint oil.
5. Regularly clean trash bins.
6. Trim trees and shrubs away from your house.
  `,
  date: "May 30, 2025",
  author: "ServiceSpot Team",
},

{
  id: 8,
  title: "How to Save Energy and Cut Utility Bills",
  description:
    "Simple upgrades and habits that can lower your monthly energy costs.",
  content: `
Lower your bills with these tips:

1. Use LED bulbs instead of incandescent.
2. Install a programmable thermostat.
3. Seal windows and doors.
4. Unplug electronics when not in use.
5. Use energy-efficient appliances.
6. Wash clothes in cold water.
  `,
  date: "May 15, 2025",
  author: "ServiceSpot Team",
},

{
  id: 9,
  title: "Signs Your Roof Needs Repair",
  description:
    "Learn the early warning signs of roof damage before it becomes costly.",
  content: `
Watch for these signs:

1. Missing or curled shingles.
2. Water stains on ceilings.
3. Granules in gutters.
4. Sagging roof deck.
5. Increased energy bills.
6. Mold or moss growth.
  `,
  date: "May 1, 2025",
  author: "ServiceSpot Team",
},

{
  id: 10,
  title: "Choosing the Right Lawn Care Service",
  description:
    "Key factors to consider when hiring a professional for your garden and lawn.",
  content: `
Select a lawn care company by:

1. Checking licenses and insurance.
2. Asking for references.
3. Reviewing service packages.
4. Understanding pricing and contracts.
5. Inquiring about eco-friendly options.
6. Confirming availability and scheduling.
  `,
  date: "Apr 20, 2025",
  author: "ServiceSpot Team",
},

  
];

const BlogSection = () => {
  const [selectedPostId, setSelectedPostId] = useState(null);

  const selectedPost = blogPosts.find((post) => post.id === selectedPostId);

  if (selectedPost) {
    // Show detail view
    return (
      <section className="bg-[#8ECAE6] py-16 lg:px-12 text-center px-12">
        <button
          onClick={() => setSelectedPostId(null)}
          className="mb-6 text-[#f3e848]  font-bold text-xl hover:underline"
        >
          ← Back to Blog List
        </button>

        <h1 className="text-3xl font-bold text-[#023047]">{selectedPost.title}</h1>
        <p className="text-gray-500 mt-1">
          {selectedPost.date} • {selectedPost.author}
        </p>

        <div className="mt-6 whitespace-pre-line text-gray-700 prose prose-lg max-w-none">
          {selectedPost.content}
        </div>
      </section>
    );
  }

  // Show list view
  return (
    <section className="bg-[#8ECAE6] py-12">
      <div className="px-6 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#023047]">
            Blog & Tips
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Stay informed with our latest tips, tricks, and guides to keep your
            home in top shape all year round.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition cursor-pointer"
              onClick={() => setSelectedPostId(post.id)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === "Enter" || e.key === " ") setSelectedPostId(post.id);
              }}
            >
              <span className="text-sm text-gray-500">
                {post.date} • {post.author}
              </span>
              <h3 className="mt-2 text-xl font-semibold text-[#023047]">
                {post.title}
              </h3>
              <p className="mt-2 text-gray-600 text-sm">{post.description}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPostId(post.id);
                }}
                className="inline-block mt-4 text-[#FFB703] font-semibold hover:underline"
              >
                Read More →
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
