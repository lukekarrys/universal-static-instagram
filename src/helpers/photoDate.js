'use strict';

import df from 'dateformat';
import createdDate from './createdDate';

export default ({
  createdTime,
  dateFormat = 'dddd, mmmm dS yyyy, h:MM:ss tt'
} = {}) => df(createdDate(createdTime), dateFormat);
