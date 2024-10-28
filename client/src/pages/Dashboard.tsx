import React from 'react'
import Background from '@/components/Background'
import { Card } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { FiHome, FiSettings, FiUser, FiFolder } from 'react-icons/fi' // Importing icons for the sidebar

const Dashboard = () => {
  return (
    <div className='bg-neutral-900'>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-neutral-800 text-neutral-300 flex flex-col p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-neutral-100 mb-6">Dashboard</h2>
          <nav className="space-y-4">
            <Link to="/home" className="flex items-center space-x-2 text-neutral-300 hover:text-neutral-100">
              <FiHome />
              <span>Home</span>
            </Link>
            <Link to="/projects" className="flex items-center space-x-2 text-neutral-300 hover:text-neutral-100">
              <FiFolder />
              <span>Projects</span>
            </Link>
            <Link to="/profile" className="flex items-center space-x-2 text-neutral-300 hover:text-neutral-100">
              <FiUser />
              <span>Profile</span>
            </Link>
            <Link to="/settings" className="flex items-center space-x-2 text-neutral-300 hover:text-neutral-100">
              <FiSettings />
              <span>Settings</span>
            </Link>
          </nav>
          <div className="mt-auto">
            <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-md transition-colors">
              Logout
            </Button>
          </div>
        </aside>

        {/* Main Dashboard Content */}
        <main className="flex-1 p-6">
          <div className="flex flex-wrap gap-6">
            {/* Example Card 1 */}
            <Card className="flex-1 w-full max-w-md bg-neutral-900 border-neutral-800 shadow-xl p-6">
              <h3 className="text-lg font-semibold text-neutral-100">Section 1</h3>
              <p className="text-neutral-400">Details and actions for this section.</p>
            </Card>
            {/* Example Card 2 */}
            <Card className="flex-1 w-full max-w-md bg-neutral-900 border-neutral-800 shadow-xl p-6">
              <h3 className="text-lg font-semibold text-neutral-100">Section 2</h3>
              <p className="text-neutral-400">Additional details and actions here.</p>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard
