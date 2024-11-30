import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'; // ES 2015

dayjs.extend(utc);

function humanizeDate(_d) {
  if (!_d) return '(no date)';
  let d = _d;
  if (typeof d.fromNow !== 'function') d = dayjs.tz(_d, 'UTC'); // assume it's coming in as a UTC date
  if (typeof d.fromNow !== 'function') {
    return `Invalid date:${typeof d}: isDate=${d instanceof Date},stringify${JSON.stringify(d)}`;
  }
  if (dayjs().diff(d) < (12 * 60 * 60 * 1000)) return d.fromNow();
  if (dayjs().diff(d) < (360 * 24 * 60 * 60 * 1000)) return d.tz().format('MMM DD, YYYY');
  return d.tz().format('MMM DD, h:mm A');
}

function abbrNum(_number, _decPlaces) {
  let number = _number;
  let decPlaces = _decPlaces;
  if (!decPlaces) {
    const len = String(number).split('.')[0].length;
    if (len % 3 === 0) decPlaces = 1;
    else if (len % 3 === 1) decPlaces = 3;
    else if (len % 3 === 2) decPlaces = 2;
    // console.log("***",{number,len,decPlaces});
  }
  if (!Number(number)) return 0;
  if (Math.abs(number) < 0.0001) { return Number(number).toFixed(6); }
  if (Math.abs(number) < 0.001) { return Number(number).toFixed(5); }
  if (Math.abs(number) < 0.01) { return Number(number).toFixed(4); }
  if (Math.abs(number) < 0.1) { return Number(number).toFixed(3); }
  if (Math.abs(number) < 1) { return Number(number).toFixed(2); }

  // 2 decimal places => 100, 3 => 1000, etc
  decPlaces = 10 ** decPlaces;

  // Enumerate number abbreviations
  const abbrev = ['', 'K', 'M', 'B', 'T'];

  // Go through the array backwards, so we do the largest first
  for (let i = abbrev.length - 1; i >= 0; i -= 1) {
    // Convert array index to "1000", "1000000", etc
    const size = 10 ** ((i) * 3);

    // If the number is bigger or equal do the abbreviation
    if (size <= Math.abs(number)) {
      // Here, we multiply by decPlaces, round, and then divide by decPlaces.
      // This gives us nice rounding to a particular decimal place.
      number = Math.round((number * decPlaces) / size) / decPlaces;

      // Handle special case where we round up to the next abbreviation
      if ((number === 1000) && (i < abbrev.length - 1)) {
        number = 1;
        i += 1;
      }

      // Add the letter for the abbreviation
      number += abbrev[i];

      // We are done... stop
      break;
    }
  }
  return number;
}

// turn numbers into abbreviated numbers, strings to shortened strings, etc
function humanize(o, _chars) {
  let chars = _chars;
  if (o === null || o === undefined || o === Infinity) return '';
  try {
    chars = chars || 200;
    switch (typeof o) {
      case 'function':
        return '[Function]';
      case 'boolean':
        return o;
      case 'string':
        if (o.length > chars) { return `${o.slice(0, chars)}...`; } return o;
      case 'NaN': return 'n/a';
      case 'number': return abbrNum(o);
      case 'object':
        return Object.keys(o).reduce((a, i) => {
          if (i?.slice(-3) === '_id') {
            // eslint-disable-next-line no-param-reassign
            a[i] = o[i];
          } else {
            // eslint-disable-next-line no-param-reassign
            a[i] = humanize(o[i], chars);
          }
          return a;
        }, {});
      default:
        return o;
    }
  } catch (e) {
    console.error(e);
    console.error('Could not humanize object:', o);
    return 'err!';
  }
}

function formatValue(_v, format, emptyValue = '') {
  let v = _v;
  if (v === undefined) return emptyValue;
  if (v == null) return emptyValue;

  if (typeof v === 'string') {
    if (v === '') return emptyValue;
  }
  switch (format) {
    case 'string': return v;
    case 'percent': v = parseFloat(v); if (v === Infinity) return 'n/a'; return `${(100 * v).toFixed(v > 0.1 ? 1 : 2)}%`;
    case 'long': { v = parseFloat(v); return v.toLocaleString(); }
    case 'long_currency': { v = parseFloat(v); return `$${v.toLocaleString(undefined, { minimumFractionDigits: Math.abs(v) >= 1000 ? 0 : 2, maximumFractionDigits: Math.abs(v) >= 1000 ? 0 : 2 })}`; }
    case 'currency': { v = parseFloat(v); return `$${Math.abs(v) >= 10000 ? humanize(v) : parseFloat(v.toFixed(Math.abs(v) >= 1000 ? 0 : 2)).toLocaleString(undefined, { minimumFractionDigits: Math.abs(v) >= 1000 ? 0 : 2, maximumFractionDigits: Math.abs(v) >= 1000 ? 0 : 2 })}`; }
    case 'date': return dayjs(v).format("MMM DD, 'YY"); // local date -- we timeshift by 6 hours to more intuitively display UTC numbers at the break of a day
    case 'datetime': return dayjs(v).format("MMM DD, 'YY hh:mm A"); // local date
    case 'utcdate': return dayjs(v).utc().format("MMM DD, 'YY");
    case 'month': return dayjs(v).format('MMM YYYY');
    case 'year': return dayjs(v).format('YYYY');
    case 'url': return `<a href='${v}' target='_blank'>Link</a>`;
    default: return humanize(parseFloat(v));
  }
}
function getCronMapping() {
  return [
    { cron: '', label: 'Manual' },
    { cron: '0 0 3 * * *', label: 'Every morning at 10 PM EST' },
    { cron: '0 0 4 * * *', label: 'Every morning at 11 PM EST' },
    { cron: '0 0 5 * * *', label: 'Every morning at 12 AM EST' },
    { cron: '0 0 6 * * *', label: 'Every morning at 1 AM EST' },
    { cron: '0 0 7 * * *', label: 'Every morning at 2 AM EST' },
    { cron: '0 0 8 * * *', label: 'Every morning at 3 AM EST' },
    { cron: '0 0 9 * * *', label: 'Every morning at 4 AM EST' },
    { cron: '0 0 10 * * *', label: 'Every morning at 5 AM EST' },
    { cron: '0 0 11 * * *', label: 'Every morning at 6 AM EST' },
    { cron: '0 0 12 * * *', label: 'Every morning at 7 AM EST' },
    { cron: '0 0 13 * * *', label: 'Every morning at 8 AM EST' },
    { cron: '0 0 14 * * *', label: 'Every morning at 9 AM EST' },
    { cron: '0 0 15 * * *', label: 'Every morning at 10 AM EST' },
    { cron: '0 0 16 * * *', label: 'Every morning at 11 AM EST' },
    { cron: '0 0 17 * * *', label: 'Every morning at 12 AM EST' },
    { cron: '0 0 11 * * 1', label: 'Every Monday morning at 6AM' },
    { cron: '0 20 */12 * * *', label: 'Every twelve hours' },
    { cron: '0 10 */8 * * *', label: 'Every eight hours' },
    { cron: '0 0 */4 * * *', label: 'Every four hours' },
    { cron: '0 0 */2 * * *', label: 'Every two hours' },
    { cron: '0 0 * * * *', label: 'Every hour' },
    { cron: '0 50 * * * *', label: 'Every hour at x:50' },
    { cron: '0 */30 * * * *', label: 'Every 30 minutes' },
    { cron: '0 */15 * * * *', label: 'Every 15 minutes' },
    { cron: '0 */10 * * * *', label: 'Every 10 minutes' },
    { cron: '0 */5 * * * *', label: 'Every 5 minutes' },
  ];
}

function getCronLabel(s) {
  return (getCronMapping().filter((m) => m.cron === s)[0] || { label: `Custom (${s})` }).label;
}

function getStringArray(s, nonZeroLength) {
  let a = s || [];
  if (typeof a === 'number') a = String(a);
  if (typeof a === 'string') a = [a];

  if (typeof s === 'string') a = s.split(',');
  a = a.map((x) => x.toString().trim()).filter(Boolean);
  if (nonZeroLength && a.length === 0) a = [0];
  return a;
}

/*
Function that supports relative date calculations, like "-3d" for 3 days ago, etc

BE CAREFUL!  Relative dates shouldn't be exact, because it will refresh every time
For that reason, any relative dates will
*/
function relativeDate(_s, _initialDate) {
  let s = _s;

  let initialDate = _initialDate;
  if (!s || s === 'none') return null;
  if (typeof s.getMonth === 'function') return s;
  // We actually want a double equals here to test strings as well
  // eslint-disable-next-line eqeqeq
  if (parseInt(s, 10) == s) {
    const r = new Date(parseInt(s, 10));
    if (r === 'Invalid Date') throw new Error(`Invalid integer date:${s}`);
    return r;
  }

  if (initialDate) {
    initialDate = new Date(initialDate);
  } else {
    initialDate = new Date();
  }

  // These are protection from endless react reloads due to changing
  // values
  if (s === 'now') s = '-0d.end.day';

  const r = s.match(/^([+-]{1})([0-9]+)([YyMwdhms]{1})([.a-z]*)$/);

  if (r) {
    if (s.indexOf('.start') < 0 && s.indexOf('.end') < 0) {
      s += '.start.day';
    }
    let period = null;
    switch (r[3]) {
      case 'Y':
      case 'y': period = 'years'; break;

      case 'M': period = 'months'; break;
      case 'w': period = 'weeks'; break;
      case 'd': period = 'days'; break;
      case 'h': period = 'hours'; break;
      case 'm': period = 'minutes'; break;
      case 's': period = 'seconds'; break;
      default: period = 'minutes'; break;
    }

    let d = dayjs(initialDate);

    if (r[1] === '+') {
      d = d.add(parseInt(r[2], 10), period);
    } else {
      d = d.subtract(parseInt(r[2], 10), period);
    }
    if (d.toDate() === 'Invalid Date') throw new Error(`Invalid date configuration:${r}`);
    if (r[4]) {
      const opts = r[4].split('.').filter(Boolean);
      if (opts[0] === 'start') d = d.startOf(opts[1] || 'day');
      else if (opts[0] === 'end') d = d.endOf(opts[1] || 'day');
      else throw new Error(`Invalid relative date,unknown options:${r[4]}`);
    }

    return d.toDate();
  }

  const x = dayjs(s);
  if (!x.isValid()) throw new Error(`Invalid Date: ${s}`);
  return x.toDate();
}

function parseRegExp(_o, opts) {
  const o = _o;
  if (o instanceof RegExp) return o;
  try {
    switch (typeof o) {
      case 'object':
        Object.keys(o).forEach((k) => {
          o[k] = parseRegExp(o[k], k);
        });
        return o;
      case 'string':
        if (o.indexOf('/') === 0 && o.lastIndexOf('/') > 0) {
          const r = o.slice(1, o.lastIndexOf('/'));
          const g = o.slice(o.lastIndexOf('/') + 1);
          const flags = (g + (opts || '')).split('').join('');
          const re = new RegExp(r, flags);
          return re;
        }
        return new RegExp(o, opts || 'i');

      default:
        return o;
    }
  } catch (e) {
    return o;
  }
}

export function casify(s) {
  if (!s) return s;
  return s.split(/[-_ ]+/g).filter(Boolean).map((a) => a.slice(0, 1).toUpperCase() + a.slice(1)).join(' ');
}

export {
  humanize, humanizeDate, relativeDate, formatValue,
  getCronLabel, getCronMapping, getStringArray, parseRegExp,
};
