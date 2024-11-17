import React, { useEffect } from 'react';
import { createBrowserRouter, Link, RouterProvider, Outlet, useNavigate } from 'react-router-dom';
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
import HelpCenter from './pages/Auth/HelpCenter';

const Index = ()=>{
  const navigate = useNavigate()
  useEffect(()=>{
    navigate("dashboard")
  },[])
  return (
    <div className="">index</div>
  )
}

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
    { path: '', element: <Index /> },
    { path: 'about', element: <About /> },
    { path: 'login', element: <Login /> },
    { path: 'register', element: <Register /> },
    { path: 'help', element: <HelpCenter /> },
    { path: 'welcome', element: <ProtectedRoute><Welcome /></ProtectedRoute> },
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
