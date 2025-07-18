import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from './store';
import Navbar from './components/layout/Navbar';
import ProtectedRoute from './components/auth/ProtectedRoutes';
import { ThemeProvider } from './components/ThemeProvider';
import { Navigate } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Test = lazy(() => import('./pages/Test'));
const RegisterForm = lazy(() => import('./components/auth/RegisterForm'));
const LoginForm = lazy(() => import('./components/auth/LoginForm'));

const App = () => {
  const { token } = useSelector((state: RootState) => state.auth);

  return (
    <ThemeProvider>
      <div className='min-h-screen bg-background text-foreground'>
        <Navbar />
        <Suspense
          fallback={
            <div className='container mx-auto p-4 text-foreground'>
              Loading...
            </div>
          }
        >
          <Routes>
            <Route path='/' element={<Home />} />
            <Route
              path='/register'
              element={
                token ? <Navigate to='/dashboard' replace /> : <RegisterForm />
              }
            />
            <Route
              path='/login'
              element={
                token ? <Navigate to='/dashboard' replace /> : <LoginForm />
              }
            />
            <Route
              path='/dashboard'
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path='/test'
              element={
                <ProtectedRoute>
                  <Test />
                </ProtectedRoute>
              }
            />
            <Route
              path='*'
              element={
                <div className='container mx-auto p-4 text-foreground'>
                  404 Not Found
                </div>
              }
            />
          </Routes>
        </Suspense>
      </div>
    </ThemeProvider>
  );
};

export default App;
