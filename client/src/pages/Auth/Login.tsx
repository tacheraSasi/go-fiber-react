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

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="relative flex h-screen w-full items-center justify-center px-4 overflow-hidden bg-gray-950">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="stars"></div>
        <div className="comet comet-1"></div>
        <div className="comet comet-2"></div>
        <div className="comet comet-3"></div>
      </div>

      {/* Login card */}
      <Card className="mx-auto w-full max-w-md relative z-10 bg-gray-900 border-gray-800 shadow-xl">
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
                  required
                  className="bg-gray-800 border-gray-700 text-gray-100 pl-10 placeholder-gray-500 focus:ring-red-500 focus:border-red-500"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium text-gray-300">Password</Label>
                <Link
                  to="#"
                  className="text-xs text-red-400 hover:text-red-300 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"}
                  required 
                  className="bg-gray-800 border-gray-700 text-gray-100 pl-10 pr-10 focus:ring-red-500 focus:border-red-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-400 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-md transition-colors">
              Sign In
            </Button>
            <Button variant="outline" className="w-full bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700 hover:text-gray-200 font-medium py-2 rounded-md transition-colors">
              Sign in with Google
            </Button>
          </div>
          <div className="text-center text-sm text-gray-400">
            Don&apos;t have an account?{" "}
            <Link to="#" className="text-red-400 hover:text-red-300 font-medium transition-colors">
              Create one now
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Inline styles for the animated background */}
      <style>{`
        .stars {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          background-image: radial-gradient(2px 2px at 20px 30px, #ffffff, rgba(0,0,0,0)),
                            radial-gradient(2px 2px at 40px 70px, #eeeeee, rgba(0,0,0,0)),
                            radial-gradient(2px 2px at 50px 160px, #dddddd, rgba(0,0,0,0)),
                            radial-gradient(2px 2px at 90px 40px, #ffffff, rgba(0,0,0,0)),
                            radial-gradient(2px 2px at 130px 80px, #eeeeee, rgba(0,0,0,0)),
                            radial-gradient(2px 2px at 160px 120px, #dddddd, rgba(0,0,0,0));
          background-repeat: repeat;
          background-size: 200px 200px;
          animation: zoom 15s infinite;
          opacity: 0;
        }

        @keyframes zoom {
          0% {
            opacity: 0;
            transform: scale(0.5);
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 0;
            transform: scale(1.5);
          }
        }

        .comet {
          position: absolute;
          background: linear-gradient(to right, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 100%);
          height: 2px;
          width: 100px;
          opacity: 0;
          transform: rotate(-45deg);
        }

        .comet-1 {
          top: 20%;
          left: -100px;
          animation: comet 10s linear infinite;
        }

        .comet-2 {
          top: 50%;
          left: -100px;
          animation: comet 8s linear infinite 3s;
        }

        .comet-3 {
          top: 80%;
          left: -100px;
          animation: comet 6s linear infinite 5s;
        }

        @keyframes comet {
          0% {
            opacity: 0;
            transform: translateX(0) translateY(0) rotate(-45deg);
          }
          20% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateX(1000px) translateY(-1000px) rotate(-45deg);
          }
        }
      `}</style>
    </div>
  )
}

export default Login
