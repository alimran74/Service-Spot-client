import React from 'react';
import CountUp from 'react-countup';
import { FaBroom, FaSmile, FaPeopleCarry } from 'react-icons/fa';
import { GiVacuumCleaner } from 'react-icons/gi';

const CountUpStats = () => {
  const stats = [
    {
      icon: <GiVacuumCleaner className="text-4xl" />,
      label: 'Total Cleaned',
      value: 1500
    },
    {
      icon: <FaBroom className="text-4xl" />,
      label: 'Successful Projects',
      value: 600
    },
    {
      icon: <FaSmile className="text-4xl" />,
      label: 'Happy Customer',
      value: 550
    },
    {
      icon: <FaPeopleCarry className="text-4xl" />,
      label: 'Our Staffs',
      value: 200
    }
  ];

  return (
    <section className="bg-[#8ECAE6] py-16 text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-center px-4">
        {stats.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div className="bg-[#FFB703] text-[#023047] w-20 h-20 flex items-center justify-center rounded-full mb-4">
              {item.icon}
            </div>
            <h3 className="text-4xl font-bold">
              <CountUp end={item.value} duration={4} />
            </h3>
            <p className="mt-2 font-medium">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CountUpStats;
