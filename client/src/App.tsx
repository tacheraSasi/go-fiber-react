// App.tsx
import React from 'react';
import { createBrowserRouter, Link, RouterProvider, Outlet } from 'react-router-dom';
import Login from './pages/Auth/Login';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <div>
          <h1>Hello World</h1>
          <nav>
            <Link to="about">About Us</Link>
            <Link to="dashboard">Dashboard</Link>
            <Link to="home">Home</Link>
          </nav>
          <Outlet /> 
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
    },
    {
      path: '/home',
      element: <Home />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
