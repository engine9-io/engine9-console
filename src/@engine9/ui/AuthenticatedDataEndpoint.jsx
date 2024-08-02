import { useAuthUser } from '@crema/hooks/AuthHooks';
import { useAccountId } from '@engine9/helpers/AccountHelper';

import axios from 'axios';

export function useAuthenticatedAxios() {
  const { token } = useAuthUser();
  const accountId = useAccountId();
  const authenticatedAxios = axios.create({
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'X-ENGINE9-ACCOUNT-ID': accountId || '',
      Authorization: `Bearer ${token}`,
    },
    baseURL: import.meta.env.VITE_ENGINE9_DATA_ENDPOINT,
  });
  return authenticatedAxios;
}
export default useAuthenticatedAxios;
