'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Badge} from 'rebass';
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

    const likesText = (count <= MAX_USERNAME_LIKES) ? ` ${this.users()}` : '';

    return (
      <span>
        <Badge pill rounded>{count}</Badge>
        {` likes${likesText}`}
      </span>
    );
  }
}
