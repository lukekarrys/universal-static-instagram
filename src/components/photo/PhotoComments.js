'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Badge, Text, Small} from 'rebass';

export default class PhotoComments extends Component {
  static defaultProps = {
    data: []
  };

  static propTypes = {
    count: PropTypes.number,
    data: PropTypes.array
  };

  render() {
    const {count, data} = this.props;
    return (
      <span>
        <span>
          <Badge ml={0}>{count}</Badge>
          {' comments'}
        </span>
        {data.map((comment) => (
          <span key={comment.id}>
            <Small
              bold
              children={comment.from.username}
            />
            <Text children={comment.text} />
          </span>
        ))}
      </span>
    );
  }
}
