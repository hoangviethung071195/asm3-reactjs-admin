import moment from 'moment';

export function getMsgTime(date: string) {
  return moment(date).format("h:mm A | MMM D");
}

export function getRelativeTime(date: string) {
  const rangeTime = Date.now() - new Date(date).getTime();
  const oneMinute = 1 * 60 * 1000;
  const oneHour = 1 * 60 * 60 * 1000;
  const oneDay = 1 * 24 * 60 * 60 * 1000;
  if (rangeTime < oneMinute) {
    return 'Just now';
  } else if (rangeTime < oneHour) {
    return moment(date).startOf('minutes').fromNow();
  } else if (rangeTime < oneDay) {
    return moment(date).startOf('hours').fromNow();
  } else {
    return getMsgTime(date);
  }
}