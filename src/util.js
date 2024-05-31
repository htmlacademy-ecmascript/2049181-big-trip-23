import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js';
import utc from 'dayjs/plugin/utc.js';
dayjs.extend(duration).extend(utc);


const humanizeDate = (date) => dayjs(date).format('MMM DD');
const humanizeTime = (date) => dayjs(date).utc().format('HH:mm');
const formatDate = (date) => dayjs(date).format('YYYY-MM-DD');
const formatTime = (date) => dayjs(date).utc().format('YYYY-MM-DD[T]HH:mm');
const humanizeEditFormDate = (date) => dayjs(date).utc().format('DD[/]MM[/]YY HH[:]mm');
const showDuration = (from, to) => {
  from = dayjs(from);
  to = dayjs(to);

  const durationObject = dayjs.duration(to.diff(from));
  let format = 'DD[D] HH[H] mm[M]';

  if (durationObject.days() === 0) {
    format = 'HH[H] mm[M]';
  } else if (durationObject.hours() === 0) {
    format = 'mm[M]';
  }

  return durationObject.format(format);
};

export {
  humanizeEditFormDate,
  humanizeDate,
  humanizeTime,
  formatDate,
  formatTime,
  showDuration
};
