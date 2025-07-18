import axios, { AxiosError } from 'axios';
import type { User, ApiError } from '../types/auth';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/auth',
});

export const register = async (username: string, password: string) => {
  try {
    const response = await api.post<{ token: string; username: string }>(
      '/register',
      { username, password }
    );
    return response.data;
  } catch (error) {
    throw (
      (error as AxiosError<ApiError>).response?.data || {
        message: 'Registration failed',
      }
    );
  }
};

export const login = async (username: string, password: string) => {
  try {
    const response = await api.post<{ token: string; username: string }>(
      '/login',
      { username, password }
    );
    return response.data;
  } catch (error) {
    throw (
      (error as AxiosError<ApiError>).response?.data || {
        message: 'Login failed',
      }
    );
  }
};

export const getUserById = async (id: string, token: string) => {
  try {
    const response = await api.get<User>('/user/' + id, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw (
      (error as AxiosError<ApiError>).response?.data || {
        message: 'Failed to fetch user',
      }
    );
  }
};
