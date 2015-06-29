'use strict';

import React from 'react';
import PhotoListItem from './PhotoListItem';

const PhotosByTag = React.createClass({
  propTypes: {
    params: React.PropTypes.object.isRequired,
    photos: React.PropTypes.array.isRequired
  },

  render () {
    return (
      <div>
        <h1>Tag {this.props.params.tag}</h1>
        <ul>
          {this.props.photos.map(photo => <li key={photo.id}><PhotoListItem {...photo} /></li>)}
        </ul>
      </div>
    );
  }
});

export default PhotosByTag;
