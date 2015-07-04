'use strict';

const createDate = (props) => {
  const time = typeof props === 'object' ? props.created_time : props;
  return time ? new Date(Number(time) * 1000) : null;
};

export default createDate;
