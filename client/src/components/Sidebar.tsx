import React from 'react'

const Sidebar = () => {
  return (
    <aside className="w-64 p-6 bg-neutral-800 hidden lg:block">
        <h2 className="text-2xl font-bold text-green-400 mb-8">ekiliHive</h2>
        <nav className="space-y-6">
        {['Projects', 'Analytics', 'Reports', 'Notifications'].map((tab) => (
            <button key={tab} className="w-full text-left px-4 py-3 rounded-lg text-neutral-300 hover:bg-neutral-700 hover:text-green-500 transition">
            {tab}
            </button>
        ))}
        </nav>
    </aside>
  )
}

export default Sidebar