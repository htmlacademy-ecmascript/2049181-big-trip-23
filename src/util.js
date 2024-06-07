import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js';
import utc from 'dayjs/plugin/utc.js';
dayjs.extend(duration).extend(utc);


const isESCbutton = (evt) => evt.code === 'Escape';
const humanizeDate = (date) => dayjs(date).format('MMM DD');
const humanizeTime = (date) => dayjs(date).utc().format('HH:mm');
const formatDate = (date) => dayjs(date).format('YYYY-MM-DD');
const formatTime = (date) => dayjs(date).utc().format('YYYY-MM-DD[T]HH:mm');
const humanizeEditFormDate = (date) => dayjs(date).utc().format('DD[/]MM[/]YY HH[:]mm');

const getDuration = (point) => {
  const from = dayjs(point.dateFrom);
  const to = dayjs(point.dateTo);

  return dayjs.duration(to.diff(from));
};

const showDuration = (point) => {
  const durationObject = getDuration(point);

  const days = durationObject.as('days').toFixed(0);
  const hours = durationObject.hours();
  const minutes = durationObject.minutes();

  const handleDays = () => (days > 0) ? `${days}D` : '';
  const handleHours = () => (hours > 0 || days > 0) ? `${hours}H` : '';

  return `${handleDays()} ${handleHours()} ${minutes}M`;
};

const sortByPrice = (a, b) => b.basePrice - a.basePrice;
const sortByDuration = (a, b) => getDuration(b).asMinutes() - getDuration(a).asMinutes();
const sortByDate = (a, b) => dayjs(a.dateFrom).diff(dayjs(b.dateFrom));

export {
  humanizeEditFormDate,
  humanizeDate,
  humanizeTime,
  formatDate,
  formatTime,
  showDuration,
  isESCbutton,
  getDuration,
  sortByPrice,
  sortByDuration,
  sortByDate
};
