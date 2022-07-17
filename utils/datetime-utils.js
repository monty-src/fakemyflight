import moment from 'moment';

export const timeConvert = (n) => {
  var num = n;
  var hours = num / 60;
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = Math.round(minutes);
  if (rhours === 0) return `${rminutes}m`;
  return `${rhours}h ${rminutes}m`;
};

export const extractDate = (date) =>
  moment(new Date(date).toDateString()).format('MMM Do');

export const extractTime = (date) =>
  moment(date).format('h:mm a');

export const dateTime = (n) =>
  `${moment(new Date(n).toDateString()).format('MMMM Do')} ${moment(n).format(
    'h:mm a'
  )}`;

export const toHoursAndMinutes = (totalMinutes) => {
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);
  return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}`;
};

const padTo2Digits = (num) => num.toString().padStart(2, '0');
