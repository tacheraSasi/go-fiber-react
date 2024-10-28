import React from 'react'
import { FiDollarSign, FiUser, FiShoppingCart, FiActivity } from 'react-icons/fi'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

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
]

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-neutral-900 text-neutral-100">
      {/* Sidebar */}
      <aside className="w-64 p-6 bg-neutral-800 hidden lg:block">
        <h2 className="text-2xl font-bold text-red-500 mb-8">Dashboard</h2>
        <nav className="space-y-6">
          {['Overview', 'Analytics', 'Reports', 'Notifications'].map((tab) => (
            <button
              key={tab}
              className="w-full text-left px-4 py-3 rounded-lg text-neutral-300 hover:bg-neutral-700 hover:text-red-500 transition"
            >
              {tab}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Section */}
      <div className="flex-1 p-8 space-y-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-red-500">Dashboard</h1>
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-neutral-700 text-neutral-300 rounded-lg">Date Range</button>
            <button className="px-4 py-2 bg-red-500 text-neutral-900 rounded-lg">Download</button>
          </div>
        </header>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Total Revenue', value: '$45,231.89', change: '+20.1%', icon: <FiDollarSign size={24} /> },
            { title: 'Subscriptions', value: '+2350', change: '+180.1%', icon: <FiUser size={24} /> },
            { title: 'Sales', value: '+12,234', change: '+19%', icon: <FiShoppingCart size={24} /> },
            { title: 'Active Now', value: '+573', change: '+201', icon: <FiActivity size={24} /> },
          ].map((card) => (
            <div
              key={card.title}
              className="p-6 bg-neutral-800 rounded-lg shadow-md flex items-center space-x-4 border border-neutral-700"
            >
              <div className="text-red-500">{card.icon}</div>
              <div>
                <h3 className="text-lg font-semibold">{card.title}</h3>
                <p className="text-2xl font-bold">{card.value}</p>
                <p className="text-neutral-400">{card.change} from last month</p>
              </div>
            </div>
          ))}
        </div>

        {/* Analytics Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Overview Chart */}
          <div className="p-6 bg-neutral-800 rounded-lg shadow-md border border-neutral-700">
            <h3 className="text-lg font-semibold mb-4">Overview</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="month" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip cursor={{ fill: 'transparent' }} />
                <Bar dataKey="revenue" fill="#00b4b4" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Sales */}
          <div className="p-6 bg-neutral-800 rounded-lg shadow-md border border-neutral-700">
            <h3 className="text-lg font-semibold mb-4">Recent Sales</h3>
            <ul className="space-y-4">
              {[
                { name: 'Olivia Martin', email: 'olivia.martin@email.com', amount: '$1,999.00' },
                { name: 'Jackson Lee', email: 'jackson.lee@email.com', amount: '$39.00' },
                { name: 'Isabella Nguyen', email: 'isabella.nguyen@email.com', amount: '$299.00' },
                { name: 'William Kim', email: 'will@email.com', amount: '$99.00' },
                { name: 'Sofia Davis', email: 'sofia.davis@email.com', amount: '$39.00' },
              ].map((sale, index) => (
                <li key={index} className="flex justify-between items-center">
                  <div>
                    <p className="text-neutral-300 font-medium">{sale.name}</p>
                    <p className="text-neutral-500 text-sm">{sale.email}</p>
                  </div>
                  <p className="text-red-500 font-semibold">{sale.amount}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
