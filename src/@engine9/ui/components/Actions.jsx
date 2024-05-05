import { useNavigate } from 'react-router-dom';
import Handlebars from 'handlebars';
/*
  An action is a user operation, like a click to navigate.
  Unlike components, it often does not have a corresponding html component.
  It typically takes a type, a context which is often used for filling in data
*/
export function useActionFunction({ action, ...props }) {
  const navigate = useNavigate();

  switch (action) {
    case 'navigate': {
      const urlTemplate = Handlebars.compile(props.url);
      return function doAction(context) {
        console.log(`Executing action ${action}`, context);
        const url = urlTemplate(context);
        navigate(url);
      };
    }
    default:
      return () => {};
  }
}

export default useActionFunction;
