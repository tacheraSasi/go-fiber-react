import React from 'react';
import { createBrowserRouter, Link, RouterProvider, Outlet } from 'react-router-dom';
import Login from './pages/Auth/Login';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Layout from './components/Layout';
import Register from './pages/Auth/Register';
import Welcome from './pages/Auth/Welcome';
import { AppProvider } from './components/AppProvider';
import { AuthProvider } from './context/AuthProvider';

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
    { path: 'register', element: <Register /> },
    { path: 'welcome', element: <Welcome /> },
    {
      path: '/home',
      element: <Home />,
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    // <AppProvider>
    // </AppProvider>
  );
};

export default App;
