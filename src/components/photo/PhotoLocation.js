'use strict';

import React, {Component, PropTypes} from 'react';

const space = (str) => str ? ` ${str}` : '';

export default class PhotoComments extends Component {
  static propTypes = {
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    name: PropTypes.string
  }

  getGeo() {
    const {latitude, longitude} = this.props;
    return latitude && longitude ? `${latitude}, ${longitude}` : '';
  }

  getName() {
    const {name} = this.props;
    return name || '';
  }

  render() {
    const name = this.getGeo();
    const geo = this.getName();

    if (!name && !geo) return null;

    return (
      <span>{`${space(name)}${space(geo)}`}</span>
    );
  }
}
