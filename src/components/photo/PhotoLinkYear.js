'use strict';

import React, {Component, PropTypes} from 'react';
import moment from 'moment';
import PhotoLink from './PhotoLink';
import {propsToDate} from '../../helpers/date';

export default class PhotoLinkYear extends Component {
  static propTypes = {
    createdTime: PropTypes.string,
    year: PropTypes.string,
    path: PropTypes.string
  };

  render() {
    const {createdTime, year, path, ...rest} = this.props;
    const mYear = createdTime || path ? moment(propsToDate({createdTime, path})).format('YYYY') : year;
    return (
      <PhotoLink path={mYear} {...rest}>{mYear}</PhotoLink>
    );
  }
}
