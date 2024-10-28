import Background from '@/components/Background'
import React from 'react'

// Props type definition for AuthLayout component
interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <Background>
      {/* Main content */}
      {children}
    </Background>
  )
}

export default AuthLayout
