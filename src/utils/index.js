import moment from 'moment';

export const validateWorkingTime = ({ startTime, endTime } = {}) => {
  //startTime should be before endTime
  if (!startTime || !endTime) return true;

  return moment(startTime).isBefore(endTime);
};

export const generateRandomString = (len, charSet) => {
  charSet =
    charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';
  for (let i = 0; i < len; i++) {
    const randomPoz = Math.floor(Math.random() * charSet.length);
    randomString += charSet.substring(randomPoz, randomPoz + 1);
  }
  return randomString;
};

export const formatCurrency = (currency) => {
  if (!currency) return '';
  return currency.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
