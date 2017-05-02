'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {map} from 'lodash';

const MAX_USERNAME_LIKES = 10;

export default class PhotoLikes extends Component {
  static defaultProps = {
    data: []
  }

  static propTypes = {
    count: PropTypes.number,
    data: PropTypes.array
  }

  users() {
    const {data} = this.props;
    return map(data, 'username').join(', ');
  }

  render() {
    const {count} = this.props;

    if (count <= MAX_USERNAME_LIKES) {
      return (
        <span>{`${count} likes ${this.users()}`}</span>
      );
    }

    return (
      <span>{`${count} likes`}</span>
    );
  }
}
