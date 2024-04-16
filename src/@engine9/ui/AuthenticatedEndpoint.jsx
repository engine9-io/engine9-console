import { useAuthUser } from '@crema/hooks/AuthHooks';

import axios from 'axios';

export function useAuthenticatedAxios() {
  const { token } = useAuthUser();
  const authenticatedAxios = axios.create({
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${token}`,
    },
    baseURL: import.meta.env.VITE_ENGINE9_DATA_ENDPOINT,
  });
  return authenticatedAxios;
}
export default useAuthenticatedAxios;
