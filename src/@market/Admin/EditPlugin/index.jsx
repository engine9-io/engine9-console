import React, { useEffect } from 'react';
import { useGetDataApi } from '@crema/hooks/APIHooks';
import AppLoader from '@crema/components/AppLoader';
import AppAnimate from '@crema/components/AppAnimate';
import { useParams } from 'react-router-dom';
import { isEmptyObject } from '@crema/helpers/ApiHelper';
import AddEditPlugin from '../AddEditPlugin';

const PluginEditPage = () => {
  const { id } = useParams();
  const [{ apiData: currentPlugin, loading }, { setQueryParams }] =
    useGetDataApi('/api/ecommerce/get', {}, {}, false);

  useEffect(() => {
    setQueryParams({ id: id });
  }, [id]);

  return loading || isEmptyObject(currentPlugin) ? (
    <AppLoader />
  ) : (
    <AppAnimate animation='transition.slideUpIn' delay={200}>
      <AddEditPlugin selectedProd={currentPlugin} />
    </AppAnimate>
  );
};
export default PluginEditPage;
