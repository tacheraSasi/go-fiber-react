import { Toaster } from '@/components/ui/toaster'
import React from 'react'

// Props type definition for AuthLayout component
interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="relative flex h-screen w-full items-center justify-center px-4 overflow-hidden bg-neutral-950">
      {/* Toast notifications */}
      <Toaster />

      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Star field */}
        <div className="stars"></div>
        
        {/* Comets moving across the screen at different speeds and delays */}
        <div className="comet comet-1"></div>
        <div className="comet comet-2"></div>
        <div className="comet comet-3"></div>
      </div>

      {/* Main content */}
      {children}

      {/* Inline styles for the animated background */}
      <style>{`
        /* Star field animation */
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
          animation: zoom 20s ease-in-out infinite;
          opacity: 0.4;
        }

        /* Animation for stars "zooming" in and out */
        @keyframes zoom {
          0% {
            opacity: 0.2;
            transform: scale(0.5);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.2);
          }
          100% {
            opacity: 0.2;
            transform: scale(1.5);
          }
        }

        /* Comet styles */
        .comet {
          position: absolute;
          background: linear-gradient(to right, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 100%);
          height: 2px;
          width: 120px;
          opacity: 0;
          transform: rotate(-45deg);
          filter: blur(1px);
        }

        /* Comet trajectories and timings */
        .comet-1 {
          top: 20%;
          left: -120px;
          animation: comet 12s linear infinite;
        }
        
        .comet-2 {
          top: 50%;
          left: -120px;
          animation: comet 10s linear infinite 2s;
        }
        
        .comet-3 {
          top: 80%;
          left: -120px;
          animation: comet 14s linear infinite 4s;
        }

        /* Comet animation sequence */
        @keyframes comet {
          0% {
            opacity: 0;
            transform: translateX(0) translateY(0) rotate(-45deg);
          }
          20% {
            opacity: 1;
          }
          80% {
            opacity: 0.8;
          }
          100% {
            opacity: 0;
            transform: translateX(1200px) translateY(-1000px) rotate(-45deg);
          }
        }
      `}</style>
    </div>
  )
}

export default AuthLayout
