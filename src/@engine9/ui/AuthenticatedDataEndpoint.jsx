import { useAuthUser } from '@crema/hooks/AuthHooks';
import { useAccountId } from '@engine9/helpers/AccountHelper';
import { useQuery } from '@tanstack/react-query';
import ObjectError from '@engine9/helpers/ErrorTypes';
import JSON5 from 'json5';

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

  const r = useQuery({
    enabled,
    initialData,
    // retry: 1,
    queryKey: [uri],
    queryFn: async () => {
      try {
        const results = await axiosWithAuth.get(uri);
        const includeLookup = {};
        if (!results.data?.data) return results;

        results.data?.included?.forEach((inc) => {
          includeLookup[`${inc.type}:${inc.id}`] = { id: inc.id, ...inc.attributes };
        });
        const { schema } = results.data;
        const records = results.data.data.map((record) => {
          const m = { id: record.id, ...record.attributes };
          Object.keys(record.relationships || {}).forEach((relId) => {
            m[relId] = (record.relationships[relId] || [])
              .map(({ type, id }) => includeLookup[`${type}:${id}`]);
          });
          return m;
        });
        return { schema, data: records };
      } catch (e) {
        console.error(e);
        // Assuming you're using Axios, you can access the error details like this
        if (axios.isAxiosError(e)) {
          throw new ObjectError({
            message: e?.response?.data?.message,
            error: e,
          });
        } else {
          throw new Error('An unknown error occurred');
        }
      }
    },
  });
  const {
    isPending, isFetching, error, data,
  } = r;

  if (isPending || isFetching || error) return { isPending: isPending || isFetching, error };
  return { data: data.data, schema: data.schema };
}

// Just some syntax to simplify getting objects
// Could eventually cache
const idRegex = /^[0-9a-z-]+$/;

export function useRemoteObjects({
  type,
  ids,
}) {
  const uniqueIds = new Set();
  (ids || []).forEach((i) => {
    if (i) uniqueIds.add(i);
  });
  const enabled = !!uniqueIds.size;

  const conditions = [
    {
      eql: `id in (${Array.from(uniqueIds).map((m) => {
        if (typeof m === 'string') {
          if (!m.match(idRegex)) throw new Error(`useRemoteObjects invalid id:${m}`);
          return `'${m}'`;
        }
        return m;
      }).join(',')})`,
    },
  ];

  const {
    isPending, error, data,
  } = useRemoteData({
    enabled,
    uri: `/data/tables/${type}?conditions=${escape(JSON5.stringify(conditions))}`,
  });
  if (error) return { error };
  // pending is actually the results if there's nothing to lookup
  if (isPending) {
    if (ids && uniqueIds.size === 0) return { data: [] };// don't look up blank ids
    return { isPending };
  }
  return { data: data || [] };
}

export default useAuthenticatedAxios;
