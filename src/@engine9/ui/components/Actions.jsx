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
export function useActionFunction({ action, ...props } = {}) {
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
        table, id, data: dataInput = {}, redirect,
      } = props;
      const redirectTemplate = redirect ? compileTemplate(redirect) : null;
      const dataTemplates = {};
      Object.entries(dataInput).forEach(([k, v]) => {
        dataTemplates[k] = compileTemplate(v);
      });
      return function doAction(context) {
        const data = {};
        Object.entries(dataTemplates).forEach(([k, valFunc]) => {
          data[k] = valFunc(context);
        });
        let u = `/data/tables/${table}`;
        if (table === 'message') {
          u = '/data/message';
        }
        axios.post(`${u}${id ? `/${id}` : ''}`, data)
          .then((results) => {
            context.record = results.data;
            if (redirectTemplate) {
              let url = redirectTemplate(context);
              if (url.indexOf('/') === 0) url = `/${accountId}${url}`;
              return navigate(url);
            }
            return notification.success({
              message: 'Saved',
              description: `Saved ${table}`,
            });
          });
      };
    }

    default:
      return () => {};
  }
}

export default useActionFunction;
