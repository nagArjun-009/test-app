import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store';
import { clearUser } from '../../store/authSlice';
import { Button } from '../ui/button';
import ThemeToggle from '../ui/ThemeToggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Menu } from 'lucide-react';
import icon from '@/assets/icon.jpg';

const Navbar: React.FC = () => {
  const { user, token } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      dispatch(clearUser());
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className='bg-background border-b border-gray-200 dark:border-gray-700 p-4'>
      <div className='container mx-auto flex justify-between items-center'>
        <div className='flex items-center space-x-4'>
          <img src={icon} alt='App Icon' className='h-8 w-8' />{' '}
          {/* Placeholder */}
          <div className='hidden md:flex space-x-4'>
            <Link
              to='/'
              className='text-foreground hover:text-gray-500 dark:hover:text-gray-300'
            >
              Home
            </Link>
            {token && (
              <>
                <Link
                  to='/dashboard'
                  className='text-foreground hover:text-gray-500 dark:hover:text-gray-300'
                >
                  Dashboard
                </Link>
                <Link
                  to='/test'
                  className='text-foreground hover:text-gray-500 dark:hover:text-gray-300'
                >
                  Test
                </Link>
              </>
            )}
          </div>
        </div>
        <div className='flex items-center space-x-4'>
          <span className='text-foreground hidden md:inline'>
            {user ? `Welcome ${user.username}` : 'Welcome Guest'}
          </span>
          <div className='hidden md:flex space-x-4'>
            {token ? (
              <Button
                onClick={handleLogout}
                variant='outline'
                className='text-foreground border-foreground/50 hover:bg-gray-100 dark:hover:bg-gray-700 bg-gray-200 dark:bg-gray-600'
              >
                Logout
              </Button>
            ) : (
              <>
                <Link to='/login'>
                  <Button
                    variant='outline'
                    className='text-foreground border-foreground/50 hover:bg-gray-100 dark:hover:bg-gray-700 bg-gray-200 dark:bg-gray-600'
                  >
                    Login
                  </Button>
                </Link>
                <Link to='/register'>
                  <Button
                    variant='outline'
                    className='text-foreground border-foreground/50 hover:bg-gray-100 dark:hover:bg-gray-700 bg-gray-200 dark:bg-gray-600'
                  >
                    Register
                  </Button>
                </Link>
              </>
            )}
            <ThemeToggle />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className='md:hidden'>
              <Button
                variant='outline'
                className='text-foreground border-foreground/50 hover:bg-gray-100 dark:hover:bg-gray-700 bg-gray-200 dark:bg-gray-600'
              >
                <Menu className='h-5 w-5' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align='end'
              className='bg-background text-foreground'
            >
              <DropdownMenuItem asChild>
                <Link
                  to='/'
                  className='text-foreground hover:bg-gray-100 dark:hover:bg-gray-700 w-full'
                >
                  Home
                </Link>
              </DropdownMenuItem>
              {token && (
                <>
                  <DropdownMenuItem asChild>
                    <Link
                      to='/dashboard'
                      className='text-foreground hover:bg-gray-100 dark:hover:bg-gray-700 w-full'
                    >
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      to='/test'
                      className='text-foreground hover:bg-gray-100 dark:hover:bg-gray-700 w-full'
                    >
                      Test
                    </Link>
                  </DropdownMenuItem>
                </>
              )}
              <DropdownMenuItem className='text-foreground'>
                <span>
                  {user ? `Welcome ${user.username}` : 'Welcome Guest'}
                </span>
              </DropdownMenuItem>
              {token ? (
                <DropdownMenuItem
                  onClick={handleLogout}
                  className='text-foreground hover:bg-gray-100 dark:hover:bg-gray-700'
                >
                  Logout
                </DropdownMenuItem>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link
                      to='/login'
                      className='text-foreground hover:bg-gray-100 dark:hover:bg-gray-700 w-full'
                    >
                      Login
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      to='/register'
                      className='text-foreground hover:bg-gray-100 dark:hover:bg-gray-700 w-full'
                    >
                      Register
                    </Link>
                  </DropdownMenuItem>
                </>
              )}
              <DropdownMenuItem className='p-0'>
                <div className='p-2 w-full'>
                  <ThemeToggle />
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
