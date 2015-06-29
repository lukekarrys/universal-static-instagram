'use strict';

import zeroFill from 'zero-fill';

const PREFIX = 'photos';

const parts = (props) => {
  const {created_time} = props;
  const date = new Date(Number(created_time) * 1000);
  date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return {year, month, day};
};

const permalink = (props) => {
  const {id} = props;
  const {year, month, day} = parts(props);

  return `/${PREFIX}/${year}/${zeroFill(2, month)}/${zeroFill(2, day)}${id ? '/' + id : ''}`;
};

const getYear = (props) => permalink({created_time: props.created_time}).replace(/\/\d\d\/\d\d$/, '');

const getMonth = (props) => permalink({created_time: props.created_time}).replace(/\/\d\d$/, '');

const getDay = (props) => permalink({created_time: props.created_time});

export {getYear as year};
export {getMonth as month};
export {getDay as day};
export {parts as parts};
export default permalink;
