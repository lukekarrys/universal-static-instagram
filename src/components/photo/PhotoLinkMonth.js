'use strict';

import React, {Component, PropTypes} from 'react';
import dateFormat from 'dateformat';
import PhotoLink from './PhotoLink';
import {propsToDate} from '../../helpers/date';

export default class PhotoLinkMonth extends Component {
  static propTypes = {
    createdTime: PropTypes.string,
    year: PropTypes.string,
    month: PropTypes.string,
    path: PropTypes.string
  };

  render() {
    const {createdTime, year, month, path, ...rest} = this.props;
    const monthDate = propsToDate({createdTime, year, month, path});
    return (
      <PhotoLink path={dateFormat(monthDate, 'yyyy/mm')} {...rest}>{dateFormat(monthDate, 'mmmm yyyy')}</PhotoLink>
    );
  }
}
