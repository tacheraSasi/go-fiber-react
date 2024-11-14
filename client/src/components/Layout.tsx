import React, { Children } from 'react'
import { Toaster } from './ui/toaster'
// import { Link } from 'react-router-dom'

interface LayoutProps{
    children:React.ReactNode
}

const Layout :React.FC<LayoutProps>= ({children}) => {
  return (
    <div className='flex bg-neutral-900 text-white'>
      <Toaster /> 
      {children}
    </div>
  )
}

export default Layout