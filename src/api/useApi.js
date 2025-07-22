import axios from 'axios';
import { useAuth } from '../context/authcontext/AuthContext';
import { useMemo } from 'react';

export default function useApi() {
  const { token } = useAuth();

  const instance = useMemo(() => {
    return axios.create({
      baseURL: 'https://to-do-list-app-production-a9dd.up.railway.app/todo',
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
  }, [token]);

  return instance;
}
