'use strict';

import React, {Component, PropTypes} from 'react';

const space = (str) => str ? ` ${str}` : '';

export default class PhotoComments extends Component {
  static propTypes = {
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    name: PropTypes.string
  }

  geo () {
    const {latitude, longitude} = this.props;
    return latitude && longitude ? `${latitude}, ${longitude}` : '';
  }

  name () {
    const {name} = this.props;
    return name ? name : '';
  }

  render () {
    const name = this.name();
    const geo = this.geo();

    if (!name && !geo) return null;

    return (
      <div>
        <span>{`Location:${space(name)}${space(geo)}`}</span>
      </div>
    );
  }
}
