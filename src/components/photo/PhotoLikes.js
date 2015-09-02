'use strict';

import React, {Component, PropTypes} from 'react';
import pluck from 'lodash/collection/pluck';

export default class PhotoLikes extends Component {
  static propTypes = {
    count: PropTypes.number,
    data: PropTypes.array
  }

  users = () => {
    const {data} = this.props;
    return pluck(data, 'username').join(', ');
  }

  render () {
    const {count} = this.props;

    if (count <= 10) {
      return (
        <span>{`${count} likes ${this.users()}`}</span>
      );
    }

    return (
      <span>{`${count} likes`}</span>
    );
  }
}
