import MobileNav from '@/components/MobileNav';
import Sidebar from '@/components/Sidebar';
import UserDrawer from '@/components/UserDrawer';
import React, { useState } from 'react';
import { FiDollarSign, FiUser, FiShoppingCart, FiActivity, FiMenu, FiX } from 'react-icons/fi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const data = [
  { month: 'Jan', revenue: 1500 },
  { month: 'Feb', revenue: 2000 },
  { month: 'Mar', revenue: 1800 },
  { month: 'Apr', revenue: 2200 },
  { month: 'May', revenue: 1500 },
  { month: 'Jun', revenue: 3000 },
  { month: 'Jul', revenue: 2700 },
  { month: 'Aug', revenue: 3200 },
  { month: 'Sep', revenue: 5000 },
  { month: 'Oct', revenue: 2900 },
  { month: 'Nov', revenue: 3500 },
  { month: 'Dec', revenue: 4200 },
];

const Dashboard = () => {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  const toggleMobileNav = () => {
    setMobileNavOpen(!isMobileNavOpen);
  };

  return (
    <div className="flex min-h-screen bg-neutral-900 text-white">
      {/* Mobile Nav */}
      <MobileNav toggleMobileNav={toggleMobileNav}/>

      <Sidebar />

      {/* Main Section */}
      <div className="flex-1 p-6 lg:p-8 space-y-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-neutral-400">Dashboard</h1>
          <button className="lg:hidden" onClick={toggleMobileNav}>
            <FiMenu size={24} />
          </button>
          <UserDrawer />
        </header>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Total Projects', value: '120', change: '+10 this month', icon: <FiUser size={24} /> },
            { title: 'Active Users', value: '4,230', change: '+5% from last month', icon: <FiActivity size={24} /> },
            { title: 'New Submissions', value: '95', change: '+15 this week', icon: <FiShoppingCart size={24} /> },
            { title: 'Feedbacks', value: '350', change: '+20 this month', icon: <FiDollarSign size={24} /> },
          ].map((card) => (
            <div key={card.title} className="p-6 bg-neutral-800 rounded-lg shadow-md flex items-center space-x-4 border border-neutral-700">
              <div className="text-green-300">{card.icon}</div>
              <div>
                <h3 className="text-lg font-semibold">{card.title}</h3>
                <p className="text-2xl font-bold">{card.value}</p>
                <p className="text-neutral-400">{card.change}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Analytics Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Overview Chart */}
          <div className="p-6 bg-neutral-800 rounded-lg shadow-md border border-neutral-700">
            <h3 className="text-lg font-semibold mb-4 text-neutral-100">Monthly Overview</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="month" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{
                    borderRadius:8,
                    backgroundColor: '#404040', // Dark neutral background
                    borderColor: '#404040',
                    color: '#E5E7EB' // Light text color for contrast
                  }}
                  labelStyle={{ color: '#A1A1AA' }}
                  itemStyle={{ color: '#86efac' }}
                />
                <Bar dataKey="revenue" fill="#86efac" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Projects */}
          <div className="p-6 bg-neutral-800 rounded-lg shadow-md border border-neutral-700">
            <h3 className="text-lg font-semibold mb-4 text-neutral-100">Recent Projects</h3>
            <ul className="space-y-4">
              {[
                { name: 'Project Alpha', owner: 'Olivia Martin', date: 'Oct 28, 2024' },
                { name: 'Project Beta', owner: 'Jackson Lee', date: 'Oct 27, 2024' },
                { name: 'Project Gamma', owner: 'Isabella Nguyen', date: 'Oct 26, 2024' },
                { name: 'Project Delta', owner: 'William Kim', date: 'Oct 25, 2024' },
                { name: 'Project Epsilon', owner: 'Sofia Davis', date: 'Oct 24, 2024' },
              ].map((project, index) => (
                <li key={index} className="flex justify-between items-center">
                  <div>
                    <p className="text-neutral-300 font-medium">{project.name}</p>
                    <p className="text-neutral-500 text-sm">Owner: {project.owner}</p>
                  </div>
                  <p className="text-green-400 font-semibold">{project.date}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
