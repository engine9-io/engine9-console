import Handlebars from 'handlebars';
import { getFormattedDate } from '@crema/helpers/DateHelper';

Handlebars.registerHelper('date', (d, f) => {
  let format;
  if (typeof f === 'string')format = f;
  return getFormattedDate(d, format);
});
Handlebars.registerHelper('json', (d) => JSON.stringify(d));

// eslint-disable-next-line import/prefer-default-export
export function compileTemplate(s) {
  if (s === undefined || s === null) return () => '<no template>';
  if (typeof s === 'object') return () => JSON.stringify(s);
  try {
    const template = Handlebars.compile(s);
    // test it
    template();
    return template;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Invalid template:', s, e);
    return () => 'Invalid Template';
  }
}
