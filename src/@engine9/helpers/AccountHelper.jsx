import { useParams } from 'react-router';

// eslint-disable-next-line import/prefer-default-export
export function useAccountId() {
  const { accountId } = useParams();
  return accountId;
}
