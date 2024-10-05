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
        table: initialTable, id: initialId, defaultData = {},
      } = props;
      const defaultDataTemplates = {};
      Object.entries(defaultData).forEach(([k, v]) => {
        defaultDataTemplates[k] = compileTemplate(v);
      });
      return function doAction(context) {
        if (context.id) {
          throw new Error('Error with table.upsert -- an id was specified not in the data object');
        }
        const redirect = context.redirect || props.redirect;
        let redirectTemplate = null;
        if (redirect) {
          if (typeof redirect !== 'string') throw new Error('redirect should be a string');
          if (redirect.indexOf('{{id}}') >= 0) throw new Error('redirect contains a {{id}}, that should probably be {{record.id}}');
          if (redirect.indexOf('{{data.id}}') >= 0) throw new Error('redirect contains a {{data.id}}, that should probably be {{record.id}}');
          redirectTemplate = compileTemplate(redirect);
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
            const errorArray = error.response?.data?.errors || [];
            const message = errorArray?.map((m) => m.message).filter(Boolean).join(',') || 'Error saving data';

            // eslint-disable-next-line no-console
            console.error('Error with post:', error.toJSON());
            if (typeof onError === 'function') return onError({ message, error });

            return notification.error({
              message,
              description: '',
              placement: 'bottomLeft',
            });
          })
          .then((results) => {
            context.record = results.data;
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
