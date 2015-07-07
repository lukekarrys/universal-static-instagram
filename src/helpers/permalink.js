'use strict';

import zeroFill from 'zero-fill';
import createdDate from './createdDate';

const PREFIX = 'photos';

const dateParts = (props) => {
  const date = createdDate(props.created_time);
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

export {getYear as getYear};
export {getMonth as getMonth};
export {getDay as getDay};
export {dateParts as dateParts};
export default permalink;
