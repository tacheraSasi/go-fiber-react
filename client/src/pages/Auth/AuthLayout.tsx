import { Toaster } from '@/components/ui/toaster'
import React from 'react'

interface AuthLayoutProps{
    children:React.ReactNode
}

const AuthLayout = ({children}:AuthLayoutProps) => {
  return (
    <div className="relative flex h-screen w-full items-center justify-center px-4 overflow-hidden bg-neutral-950">
    {/* taoster */}
    <Toaster/>
    {/* Animated background */}
    <div className="absolute inset-0 overflow-hidden">
      <div className="stars"></div>
      <div className="comet comet-1"></div>
      <div className="comet comet-2"></div>
      <div className="comet comet-3"></div>
    </div>

    {/* childred */}
    {children}

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

export default AuthLayout