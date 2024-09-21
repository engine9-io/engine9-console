import { useAuthUser } from '@crema/hooks/AuthHooks';
import { useAccountId } from '@engine9/helpers/AccountHelper';
import { useQuery } from '@tanstack/react-query';

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

export function useAlternateDataSourceAuthenticatedAxios() {
  const { token } = useAuthUser();
  const accountId = useAccountId();
  const authenticatedAxios = axios.create({
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'X-Account-Id': accountId || 'system',
      Authorization: `Bearer ${token}`,
    },
  });
  return authenticatedAxios;
}

export function useRemoteData(
  {
    enabled = true,
    initialData = undefined,
    uri,
  },
) {
  const axiosWithAuth = useAuthenticatedAxios();

  const {
    isPending, isFetching, error, data,
  } = useQuery({
    enabled,
    initialData,
    queryKey: [uri],
    queryFn: () => axiosWithAuth
      .get(uri)
      .then((results) => {
        const includeLookup = {};
        results.data?.includes?.forEach((inc) => {
          includeLookup[`${inc.type}:${inc.id}`] = { id: inc.id, ...inc.attributes };
        });
        const output = results.data.data.map((record) => {
          const m = { id: record.id, ...record.attributes };
          Object.keys(record.relationships || {}).forEach((relId) => {
            m[relId] = (record.relationships[relId] || [])
              .map(({ type, id }) => includeLookup[`${type}:${id}`]);
          });
          return m;
        });
        return output;
      }),
  });
  if (isPending || isFetching || error) return { isPending, isFetching, error };
  return { data };
}

export default useAuthenticatedAxios;
