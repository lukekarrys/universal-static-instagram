'use strict';

import React, {Component, PropTypes} from 'react';

export default class PhotoComments extends Component {
  static propTypes = {
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    name: PropTypes.string
  }

  geo () {
    const {latitude, longitude} = this.props;
    return latitude && longitude ? `${latitude},${longitude}` : '';
  }

  render () {
    const {latitude, longitude, name} = this.props;

    if (!name && !latitude && !longitude) return null;

    return (
      <div>
        <span>{`Location: ${name} ${this.geo()}`}</span>
      </div>
    );
  }
}
