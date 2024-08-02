import { useParams } from 'react-router-dom';

// eslint-disable-next-line import/prefer-default-export
export function useAccountId() {
  const { accountId } = useParams();
  return accountId;
}
