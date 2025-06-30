import React from 'react';
import CountUp from 'react-countup';
import { Paper, Typography, Box } from '@mui/material';
import { FaBroom, FaSmile, FaPeopleCarry, FaUserPlus, FaMoneyBillWave, FaStar } from 'react-icons/fa';
import { GiVacuumCleaner, GiClockwork } from 'react-icons/gi';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const CountUpStats = () => {
  const stats = [
    { icon: <GiVacuumCleaner className="text-[#023047]" />, label: 'Total Cleaned', value: 1500, bgColor: '#FFB703' },
    { icon: <FaBroom className="text-[#023047]" />, label: 'Successful Projects', value: 600, bgColor: '#FFB703' },
    { icon: <FaSmile className="text-[#023047]" />, label: 'Happy Customers', value: 550, bgColor: '#FFB703' },
    { icon: <FaPeopleCarry className="text-[#023047]" />, label: 'Our Staffs', value: 200, bgColor: '#FFB703' },
    { icon: <FaUserPlus className="text-[#023047]" />, label: 'New Signups', value: 120, bgColor: '#FFB703' },
    { icon: <FaMoneyBillWave className="text-[#023047]" />, label: 'Monthly Revenue (k)', value: 75, bgColor: '#FFB703' },
    { icon: <GiClockwork className="text-[#023047]" />, label: 'Hours Worked', value: 12000, bgColor: '#FFB703' },
    { icon: <FaStar className="text-[#023047]" />, label: 'Positive Feedbacks', value: 450, bgColor: '#FFB703' },
  ];

  const projectData = [
    { month: 'Jan', projects: 40 },
    { month: 'Feb', projects: 55 },
    { month: 'Mar', projects: 65 },
    { month: 'Apr', projects: 80 },
    { month: 'May', projects: 70 },
    { month: 'Jun', projects: 90 },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 30 },
    { month: 'Feb', revenue: 45 },
    { month: 'Mar', revenue: 55 },
    { month: 'Apr', revenue: 65 },
    { month: 'May', revenue: 60 },
    { month: 'Jun', revenue: 75 },
  ];

  const pieData = [
    { name: 'Residential', value: 400, color: '#FFB703' },
    { name: 'Commercial', value: 300, color: '#219EBC' },
    { name: 'Premium', value: 300, color: '#023047' },
  ];

  return (
    <div className="bg-[#8ECAE6] py-20 px-4 sm:px-6 lg:px-8 text-[#023047]">
      <h2 className="text-3xl font-bold text-center mb-12">Our Achievements & Analytics</h2>

      {/* Stats Grid */}
      <div className="mx-auto  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-16">
        {stats.map((item, idx) => (
          <Paper
            key={idx}
            elevation={4}
            className="p-6 bg-white rounded-xl flex flex-col items-center transition-transform hover:scale-[1.03] shadow-md"
            sx={{ minWidth: 0 }} // Important to prevent flexbox issues
          >
            <Box
              className="rounded-full mb-5 flex items-center justify-center"
              sx={{
                bgcolor: item.bgColor,
                width: 72,
                height: 72,
                fontSize: 36,
              }}
            >
              {item.icon}
            </Box>
            <Typography variant="h5" fontWeight="bold" className="leading-none">
              <CountUp end={item.value} duration={3} separator="," />
            </Typography>
            <Typography variant="subtitle1" mt={1} className="text-center mt-2">
              {item.label}
            </Typography>
          </Paper>
        ))}
      </div>

      {/* Charts Section */}
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-2">
        <Paper elevation={3} className="p-6 h-[320px]">
          <Typography variant="h6" mb={2} textAlign="center">
            Monthly Projects Completed
          </Typography>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={projectData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="projects" fill="#219EBC" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>

        <Paper elevation={3} className="p-6 h-[320px]">
          <Typography variant="h6" mb={2} textAlign="center">
            Monthly Revenue (k)
          </Typography>
          <ResponsiveContainer width="100%" height="85%">
            <LineChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#FFB703" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </Paper>

        <Paper elevation={3} className="p-6 h-[320px]">
          <Typography variant="h6" mb={2} textAlign="center">
            Service Categories Distribution
          </Typography>
          <ResponsiveContainer width="100%" height="85%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                fill="#8884d8"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </Paper>
      </div>
    </div>
  );
};

export default CountUpStats;
