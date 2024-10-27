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
import { useToast } from '@/hooks/use-toast'
import { ToastAction } from '@/components/ui/toast'

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Passwords do not match.",
        // action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
      console.log("Passwords do not match")
      return
    }
    console.log("Register submitted with:", { name, email, password })
    // Add registration handling logic here (e.g., API call)
  }

  return (
    <AuthLayout>
      <Card className="mx-auto w-full max-w-md relative z-10 bg-neutral-900 border-neutral-800 shadow-xl">
        <form onSubmit={handleSubmit}>
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-semibold text-neutral-100">Create an Account</CardTitle>
            <CardDescription className="text-neutral-400">
              Fill in your details to create a new account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-neutral-300">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Tachera Sasi"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-neutral-800 border-neutral-700 text-neutral-100 pl-3 placeholder-neutral-500 focus:ring-red-500 focus:border-red-500"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-neutral-300">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-neutral-800 border-neutral-700 text-neutral-100 pl-10 placeholder-neutral-500 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-neutral-300">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-500" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-neutral-800 border-neutral-700 text-neutral-100 pl-10 pr-10 focus:ring-red-500 focus:border-red-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-400 focus:outline-none"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-sm font-medium text-neutral-300">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-500" />
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="bg-neutral-800 border-neutral-700 text-neutral-100 pl-10 pr-10 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-md transition-colors">
              Sign Up
            </Button>
            <div className="text-center text-sm text-neutral-400">
              Already have an account?{" "}
              <Link to="/login" className="text-red-400 hover:text-red-300 font-medium transition-colors">
                Sign in here
              </Link>
            </div>
          </CardContent>
        </form>
      </Card>
    </AuthLayout>
  )
}

export default Register
