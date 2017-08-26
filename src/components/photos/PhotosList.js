'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Media, Badge, Image, Flex, Box} from 'rebass';
import PhotoLink from '../photo/PhotoLink';
import photoSrc from '../../helpers/photoSrc';
import photoTitle from '../../helpers/photoTitle';
import photoDate from '../../helpers/photoDate';

export default class PhotosList extends Component {
  static propTypes = {
    photos: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired
  };

  render() {
    return (
      <Flex wrap>
        {this.props.photos.map((photo) => (
          <Box key={photo.id} width={[1, null, null, 1 / 2]}>
            <Media mb={4}>
              <Image mr={3} src={photoSrc(photo.images[this.props.type])} />
              <Flex wrap>
                <Box width={1} mb={2}><PhotoLink path={photo.id}>{photoDate(photo)}</PhotoLink></Box>
                <Box width={1} mb={2}>{photoTitle(photo)}</Box>
                <Box width={1}>
                  <Badge ml={0} mr={0}>{photo.comments.count}</Badge> comments
                  {' '}
                  <Badge ml={1} mr={0}>{photo.likes.count}</Badge> likes
                </Box>
              </Flex>
            </Media>
          </Box>
        ))}
      </Flex>
    );
  }
}
