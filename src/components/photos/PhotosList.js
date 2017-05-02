'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Media} from 'rebass';
import PhotoDate from '../photo/PhotoDate';
import PhotoLink from '../photo/PhotoLink';
import PhotoTitle from '../photo/PhotoTitle';
import getSrc from '../../helpers/photoImage';

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
            img={getSrc(photo.images[this.props.type])}
          >
            <p><PhotoLink path={photo.id}><PhotoDate createdTime={photo.createdTime} /></PhotoLink></p>
            <p><PhotoTitle caption={photo.caption} /></p>
            <p>
              Comments: {photo.comments.count}
              {' '}
              Likes: {photo.likes.count}
            </p>
          </Media>
        )}
      </div>
    );
  }
}
