'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import dateFormat from 'dateformat';
import PhotoLink from './PhotoLink';
import {propsToDate} from '../../helpers/date';

export default class PhotoLinkDay extends Component {
  static propTypes = {
    createdTime: PropTypes.string,
    year: PropTypes.string,
    month: PropTypes.string,
    day: PropTypes.string,
    path: PropTypes.string
  }

  render() {
    const {createdTime, year, month, day, path, ...rest} = this.props;
    const dayDate = propsToDate({createdTime, year, month, day, path});
    return (
      <PhotoLink path={dateFormat(dayDate, 'yyyy/mm/dd')} {...rest}>{dateFormat(dayDate, 'mmmm d yyyy')}</PhotoLink>
    );
  }
}
