import React, { Children } from 'react'
import { Link } from 'react-router-dom'

interface LayoutProps{
    children:React.ReactNode
}

const Layout :React.FC<LayoutProps>= ({children}) => {
  return (
    <div className='flex bg-neutral-900 text-white'>
      {/* <h1>Hello World</h1>
      <nav>
        <Link to="about">About Us</Link>
        <Link to="dashboard">Dashboard</Link>
        <Link to="home">Home</Link>
      </nav> */}
      {children}
    </div>
  )
}

export default Layout