'use strict';

import React, {PropTypes} from 'react';
import PhotoListItem from './PhotoListItem';

const PhotosList = React.createClass({
  propTypes: {
    photos: PropTypes.array.isRequired
  },

  render () {
    return (
      <ul>
        {this.props.photos.map(photo =>
          <li key={photo.id}><PhotoListItem {...photo} /></li>
        )}
      </ul>
    );
  }
});

export default PhotosList;
