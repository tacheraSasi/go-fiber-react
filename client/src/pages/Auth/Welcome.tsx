import React from 'react'
import AuthLayout from './AuthLayout'
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useAuth } from '@/context/AuthProvider'

const Welcome = () => {
  const { authenticatedUser } = useAuth()
  const user = authenticatedUser
  
  return (
    <AuthLayout>
      <Card className="mx-auto w-full max-w-md relative z-10 bg-neutral-900 border-neutral-800 shadow-2xl rounded-lg p-6">
        <CardHeader className="space-y-2 pb-6">
          <CardTitle className="text-3xl font-bold text-neutral-100">Welcome to ekiliHive!</CardTitle>
          <CardDescription className="text-neutral-400">
            {user?.name ? `${user.name}, ` : ''}Your account has been successfully created. Ready to showcase your work and discover projects from others?
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4 text-center">
            <p className="text-neutral-300 mb-3 text-sm leading-relaxed">
              Dive into your personalized dashboard to add projects, connect with other creators, and get inspired by a world of innovation!
            </p>

            <Link to="/dashboard">
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition-colors duration-300 ease-in-out">
                Enter the Realm of Wonders
              </Button>
            </Link>
            
            <p className="text-neutral-500 mt-4 text-xs">
              If you have any questions, feel free to <Link to="/help" className="text-green-500 hover:text-green-600 underline">visit our help center</Link>.
            </p>
          </div>
        </CardContent>
      </Card>
    </AuthLayout>
  )
}

export default Welcome
