'use strict';

import zeroFill from 'zero-fill';
import createdDate from './createdDate';

const PREFIX = 'photos';

const propsToDate = (props) => {
  const {created_time, year, month, day} = props;
  return created_time ?
    createdDate(created_time) :
    new Date(year, month === undefined ? 0 : (Number(month) - 1), day === undefined ? 1 : day);
};

const dateParts = (props) => {
  const date = propsToDate(props);
  const year = date.getFullYear() + '';
  const month = zeroFill(2, date.getMonth() + 1);
  const day = zeroFill(2, date.getDate());

  return {year, month, day};
};

const _datePath = (props) => {
  const {year, month, day} = dateParts(props);
  return `/${PREFIX}/${year}/${month}/${day}`;
};

const permalink = (props) => {
  const {id} = props;
  return `${_datePath(props)}${id ? '/' + id : ''}`;
};

const getYear = (props) => _datePath(props).replace(/\/\d\d\/\d\d$/, '');
const getMonth = (props) => _datePath(props).replace(/\/\d\d$/, '');
const getDay = (props) => _datePath(props);

export {propsToDate as propsToDate};
export {getYear as getYear};
export {getMonth as getMonth};
export {getDay as getDay};
export {dateParts as dateParts};
export default permalink;
