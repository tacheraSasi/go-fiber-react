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

const HelpCenter = () => {
  const { authenticatedUser } = useAuth()
  const user = authenticatedUser
  
  return (
    <AuthLayout>
      <Card className="mx-auto w-full max-w-md relative z-10 bg-neutral-900 border-neutral-800 shadow-2xl rounded-lg p-6">
        <CardHeader className="space-y-2 pb-6">
          <CardTitle className="text-3xl font-bold text-neutral-100">Help Center ekiliHive!</CardTitle>
          
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4 text-center">
            <p className="text-neutral-300 mb-3 text-sm leading-relaxed">
              Unfortunately this service is currently not available please contact
              <a href="mailto:support@ekilie.com" className="text-green-500 hover:text-green-600 underline">support@ekilie.com</a>.
            </p>

            {/* <Link to="/dashboard">
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition-colors duration-300 ease-in-out">
                Enter the Realm of Wonders
              </Button>
            </Link> */}
            
            <p className="text-neutral-500 mt-4 text-xs">
              Go  <Link to="/welcome" className="text-green-500 hover:text-green-600 underline">BACK</Link>.
            </p>
          </div>
        </CardContent>
      </Card>
    </AuthLayout>
  )
}

export default HelpCenter
