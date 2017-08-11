'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Media, Badge, Image} from 'rebass';
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
      <div>
        {this.props.photos.map((photo) => (
          <Media key={photo.id}>
            <Image src={photoSrc(photo.images[this.props.type])} />
            <PhotoLink path={photo.id}>{photoDate(photo)}</PhotoLink>
            {photoTitle(photo)}
            <Badge>{photo.comments.count}</Badge> comments
            {' '}
            <Badge>{photo.likes.count}</Badge> likes
          </Media>
        ))}
      </div>
    );
  }
}
