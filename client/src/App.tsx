import React from 'react'
import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom'
import Login from './pages/Auth/Login'
import About from './pages/About'
import Dashboard from './pages/Dashboard'

const App = () => {
  const route = createBrowserRouter([
    {
      path:"/",
      element:(
        <div>
          <h1>Hello World</h1>
          <Link to="about">About Us</Link>
          <Link to="dashboard">Dashboard</Link>
        </div>
      ),
      children: [
        { path: 'about', element: <About /> },
        { path: 'login', element: <Login /> },
        {
          path: 'dashboard',
          element: (
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          ),
        },
      ],
    }
  ])
  return (
    <RouterProvider />
  )
}

export default App