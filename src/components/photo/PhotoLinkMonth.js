'use strict';

import React, {Component, PropTypes} from 'react';
import moment from 'moment';
import PhotoLink from './PhotoLink';
import {propsToDate} from '../../helpers/date';

export default class PhotoLinkMonth extends Component {
  static propTypes = {
    createdTime: PropTypes.string,
    year: PropTypes.string,
    month: PropTypes.string,
    path: PropTypes.string
  }

  render() {
    const {createdTime, year, month, path, ...rest} = this.props;
    const mMonth = moment(propsToDate({createdTime, year, month, path}));
    return (
      <PhotoLink path={mMonth.format('YYYY/MM')} {...rest}>{mMonth.format('MMMM YYYY')}</PhotoLink>
    );
  }
}
