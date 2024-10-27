import { useState } from 'react'
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'
import AuthLayout from './AuthLayout'

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Login submitted with:", { email, password })
    // Add login handling logic here (e.g., API call)
  }

  return (
    <AuthLayout>
      <Card className="mx-auto w-full max-w-md relative z-10 bg-gray-900 border-gray-800 shadow-xl">
        <form onSubmit={handleSubmit}>
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-semibold text-gray-100">Welcome back</CardTitle>
            <CardDescription className="text-gray-400">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-300">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-gray-800 border-gray-700 text-gray-100 pl-10 placeholder-gray-500 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-300">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-gray-800 border-gray-700 text-gray-100 pl-10 pr-10 focus:ring-red-500 focus:border-red-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-400 focus:outline-none"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>
            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-md transition-colors">
              Sign In
            </Button>
            <div className="text-center text-sm text-gray-400">
              Don't have an account?{" "}
              <Link to="/register" className="text-red-400 hover:text-red-300 font-medium transition-colors">
                Create one here
              </Link>
            </div>
          </CardContent>
        </form>
      </Card>
    </AuthLayout>
  )
}

export default Login
