import React from 'react'
import { FiX } from 'react-icons/fi'

interface MobNavProps{
    toggleMobileNav: () => void;
    isMobileNavOpen: boolean
}

const MobileNav = ({toggleMobileNav,isMobileNavOpen}:MobNavProps) => {
    
  return (
    <div className={`fixed top-0 left-0 w-64 h-full bg-neutral-800 transition-transform transform ${isMobileNavOpen ? 'translate-x-0' : '-translate-x-full'} lg:hidden`}>
        <div className="p-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-green-400">ekiliHive</h2>
        <button onClick={toggleMobileNav}>
            <FiX size={24} />
        </button>
        </div>
        <nav className="space-y-6 p-4">
        {['Projects', 'Analytics', 'Reports', 'Notifications'].map((tab) => (
            <button key={tab} className="w-full text-left px-4 py-3 rounded-lg text-neutral-300 hover:bg-neutral-700 hover:text-green-500 transition">
            {tab}
            </button>
        ))}
        </nav>
    </div>
  )
}

export default MobileNav