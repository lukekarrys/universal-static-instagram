'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class PhotoComments extends Component {
  static defaultProps = {
    data: []
  }

  static propTypes = {
    count: PropTypes.number,
    data: PropTypes.array
  }

  render() {
    const {count, data} = this.props;
    return (
      <span>
        <span>{`${count} comments`}</span>
        <ul>
          {data.map((comment) =>
            <li key={comment.id}>{`${comment.from.username}: ${comment.text}`}</li>
          )}
        </ul>
      </span>
    );
  }
}
