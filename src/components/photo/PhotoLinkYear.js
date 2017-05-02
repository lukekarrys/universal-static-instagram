'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import dateFormat from 'dateformat';
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
    const mYear = createdTime || path ? dateFormat(propsToDate({createdTime, path}), 'yyyy') : year;
    return (
      <PhotoLink path={mYear} {...rest}>{mYear}</PhotoLink>
    );
  }
}
