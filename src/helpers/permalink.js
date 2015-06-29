'use strict';

import zeroFill from 'zero-fill';

const PREFIX = 'photos';

const dateParts = (props) => {
  const {created_time} = typeof props === 'object' ? props : {created_time: props};
  const date = new Date(Number(created_time) * 1000);

  const year = date.getFullYear();
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

export {getYear as getYear};
export {getMonth as getMonth};
export {getDay as getDay};
export {dateParts as dateParts};
export default permalink;
