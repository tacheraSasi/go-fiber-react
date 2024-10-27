import React from 'react';
import { createBrowserRouter, Link, RouterProvider, Outlet } from 'react-router-dom';
import Login from './pages/Auth/Login';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Layout from './components/Layout';

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
       <Layout>
          <Outlet />
       </Layout>
      ),
      children: [
        
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
    { path: 'about', element: <About /> },
    { path: 'login', element: <Login /> },
    {
      path: '/home',
      element: <Home />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
