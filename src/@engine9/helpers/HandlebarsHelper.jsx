import Handlebars from 'handlebars';
import { getFormattedDateTime } from '@crema/helpers/DateHelper';

Handlebars.registerHelper('date', (d, f) => {
  let format;
  if (typeof f === 'string')format = f;
  return getFormattedDateTime(d, undefined, format);
});

// eslint-disable-next-line import/prefer-default-export
export function compileTemplate(s) {
  return Handlebars.compile(s);
}
