'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Badge, Text, Small, Flex, Box} from 'rebass';

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
          <Badge ml={0} mr={0}>{count}</Badge>
          {' comments'}
        </span>
        <Flex wrap>
          {data.map((comment) => (
            <Box width={1} mb={1} key={comment.id}>
              <Small
                bold
                children={comment.from.username}
              />
              <Text children={comment.text} />
            </Box>
          ))}
        </Flex>
      </span>
    );
  }
}
