'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Media, Badge, Block} from 'rebass';
import PhotoLink from '../photo/PhotoLink';
import photoSrc from '../../helpers/photoSrc';
import photoTitle from '../../helpers/photoTitle';
import photoDate from '../../helpers/photoDate';

export default class PhotosList extends Component {
  static propTypes = {
    photos: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired
  }

  render() {
    return (
      <div>
        {this.props.photos.map((photo) =>
          <Media
            key={photo.id}
            align='center'
            img={photoSrc(photo.images[this.props.type])}
          >
            <Block><PhotoLink path={photo.id}>{photoDate(photo)}</PhotoLink></Block>
            <Block>{photoTitle(photo)}</Block>
            <Block>
              <Badge pill rounded>{photo.comments.count}</Badge> comments
              {' '}
              <Badge pill rounded>{photo.likes.count}</Badge> likes
            </Block>
          </Media>
        )}
      </div>
    );
  }
}
