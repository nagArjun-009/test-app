import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/authSlice';
import { register } from '../../api/authApi';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import type { ApiError } from '../../types/auth';

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: () => register(username, password),
    onSuccess: (data) => {
      dispatch(
        setUser({
          user: { id: '', username: data.username },
          token: data.token,
        })
      );
      navigate('/dashboard');
    },
    onError: (err: ApiError) => {
      setError(err.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!username || !password) {
      setError('Username and password are required');
      return;
    }
    mutation.mutate();
  };

  return (
    <div className='container mx-auto p-4 max-w-md'>
      <h2 className='text-2xl font-bold mb-4'>Register</h2>
      {error && <p className='text-red-500 mb-4'>{error}</p>}
      <form onSubmit={handleSubmit} className='space-y-4'>
        <Input
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type='submit' disabled={mutation.isPending}>
          {mutation.isPending ? 'Registering...' : 'Register'}
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;
