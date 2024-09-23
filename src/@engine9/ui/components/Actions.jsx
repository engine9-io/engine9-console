import { useNavigate } from 'react-router-dom';
import { useAccountId } from '@engine9/helpers/AccountHelper';
import { compileTemplate } from '@engine9/helpers/HandlebarsHelper';
import { useAuthenticatedAxios } from '@engine9/ui/AuthenticatedDataEndpoint';
import { notification } from 'antd';

/*
  An action is a user operation, like a click to navigate.
  Unlike components, it often does not have a corresponding html component.
  It typically takes a type, and some properties that can be compiled,
   and is evaluated against context which is often used for filling in data
*/
export function useActionFunction({
  action, onStart, ...props
} = {}) {
  const navigate = useNavigate();
  const accountId = useAccountId();
  const axios = useAuthenticatedAxios();

  if (!action) return () => {};

  switch (action) {
    case 'navigate': {
      const urlTemplate = compileTemplate(props.url);
      return function doAction(context) {
        // console.log(`Executing action ${action}`, context);
        let url = urlTemplate(context);
        if (url.indexOf('/') === 0) url = `/${accountId}${url}`;
        navigate(url);
      };
    }
    case 'table.upsert': {
      const {
        table: initialTable, id: initialId, defaultData = {}, redirect,
      } = props;
      const redirectTemplate = redirect ? compileTemplate(redirect) : null;
      const defaultDataTemplates = {};
      Object.entries(defaultData).forEach(([k, v]) => {
        defaultDataTemplates[k] = compileTemplate(v);
      });
      return function doAction(context) {
        if (context.id) {
          throw new Error('Error with table.upsert -- an id was specified not in the data object');
        }
        if (typeof onStart === 'function') onStart(context);
        const data = {};
        Object.entries(defaultDataTemplates).forEach(([k, valFunc]) => {
          data[k] = valFunc(context);
        });
        Object.entries(context.data || {}).forEach(([k, v]) => {
          data[k] = v;
        });
        const id = data.id || initialId;
        const table = context.table || initialTable;
        delete data.id;
        let u = `/data/tables/${table}`;
        if (table === 'message') {
          u = '/data/message';
        }
        const onComplete = context.onComplete || props.onComplete;
        const onError = context.onError || props.onError;
        axios.post(`${u}${id ? `/${id}` : ''}`, data)
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.error('Error with post:', error.toJSON());
            if (typeof onError === 'function') return onError(error.toJSON());

            return notification.error({
              message: 'Error saving data',
              description: '',
              placement: 'bottomLeft',
            });
          })
          .then((results) => {
            context.data = results.data;
            if (redirectTemplate) {
              let url = redirectTemplate(context);
              if (url.indexOf('/') === 0) url = `/${accountId}${url}`;
              return navigate(url);
            }
            notification.success({
              message: `Saved ${table}`,
              // description: `Saved ${table}`,
              placement: 'bottomLeft',
            });
            if (typeof onComplete === 'function') return onComplete(context);
            return {};
          });
      };
    }

    default:
      return () => {};
  }
}

export default useActionFunction;
