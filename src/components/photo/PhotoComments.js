'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Badge, Block, Text} from 'rebass';

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
        <span>
          <Badge pill rounded>{count}</Badge>
          {' comments'}
        </span>
        {data.map((comment) =>
          <Block key={comment.id} borderLeft px={2} borderColor='black'>
            <Text
              small
              bold
              color='midgray'
              children={comment.from.username}
            />
            <Text children={comment.text} />
          </Block>
        )}
      </span>
    );
  }
}
