'use strict';

import React, {Component, PropTypes} from 'react';
import moment from 'moment';
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

  render () {
    const {createdTime, year, month, day, path} = this.props;
    const mDay = moment(propsToDate({createdTime, year, month, day, path}));
    return (
      <PhotoLink path={mDay.format('YYYY/MM/DD')}>{`Other photos from ${mDay.format('MMMM D YYYY')}`}</PhotoLink>
    );
  }
}
