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

const Welcome = () => {
  return (
    <AuthLayout>
      <Card className="mx-auto w-full max-w-md relative z-10 bg-neutral-900 border-neutral-800 shadow-xl">
        <CardHeader className="space-y-1 pb-6">
          <CardTitle className="text-2xl font-semibold text-neutral-100">Welcome to ShowBase!</CardTitle>
          <CardDescription className="text-neutral-400">
            Your account has been successfully created. Ready to showcase your work and discover projects from others?
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4 text-center">
            <p className="text-neutral-300 mb-2">
              Dive into your personalized dashboard to add projects, connect with other creators, and get inspired!
            </p>

            <Link to="/dashboard">
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-md transition-colors">
                Enter the realm of wonders
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </AuthLayout>
  )
}

export default Welcome
