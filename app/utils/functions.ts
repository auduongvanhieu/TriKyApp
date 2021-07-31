import Moment from 'moment';
import { images } from '../theme/images';
var numeral = require('numeral');

export const trunc = (text, limit) => {
  let mlimit = limit ? limit : 12;
  return text.length > mlimit ? `${text.substr(0, mlimit)}...` : text;
}

export const currencyFormat = (num) => {
  return num?.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') || 0
}
export const convertDateToString = (text) => {
  return text ? Moment(text, 'YYYY-MM-DDThh:mm:ss').format('DD/MM/YYYY') : '';
}
export const convertStringToDate = (text) => {
  return text ? Moment(text, 'DD/MM/YYYY').format('YYYY-MM-DDThh:mm:ss') : '';
}
export const numberFormat = (number) => {
  return numeral(number).format('0,0');
}

export const isValidDate = (dateString) => {
  var regEx = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!dateString.match(regEx)) return false;  // Invalid format
  var dateStr = Moment(dateString, "DD/MM/YYYY").format("YYYY-MM-DD")
  var d = new Date(dateStr);
  console.log('hieunv', 'd', d)
  var dNum = d.getTime();
  if (!dNum && dNum !== 0) return false; // NaN value, Invalid date
  return d.toISOString().slice(0, 10) === dateStr;
}

export const getGenderName = (gender) => {
  var genderName = "Nữ";
  if (gender == 0) {
    genderName = "Nữ";
  } else if (gender == 1) {
    genderName = "Nam";
  } else if (gender == 2) {
    genderName = "Đồng tính nữ";
  } else if (gender == 3) {
    genderName = "Đồng tính nam";
  }
  return genderName;
}

export const getGenderImage = (gender) => {
  var genderImage = images.ic_gender_girl;
  if (gender == 0) {
    genderImage = images.ic_gender_girl;
  } else if (gender == 1) {
    genderImage = images.ic_gender_boy;
  } else if (gender == 2) {
    genderImage = images.ic_gender_lesbian;
  } else if (gender == 3) {
    genderImage = images.ic_gender_gay;
  }
  return genderImage;
}
