'use strict';

import zeroFill from 'zero-fill';
import createdDate from './createdDate';

export const propsToDate = (props) => {
  const {createdTime, path} = props;
  let {year, month, day} = props;

  if (path && !createdTime) {
    [year, month, day] = path.split('/');
  }

  return createdTime
    ? createdDate(createdTime)
    : new Date(year, month === undefined ? 0 : (Number(month) - 1), day === undefined ? 1 : day);
};

export const dateParts = (props) => {
  const date = propsToDate(props);
  const year = date.getFullYear().toString();
  const month = zeroFill(2, date.getMonth() + 1);
  const day = zeroFill(2, date.getDate());

  return {year, month, day};
};
