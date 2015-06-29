'use strict';

import React from 'react';
import PhotoListItem from './PhotoListItem';

const PhotosByPage = React.createClass({
  propTypes: {
    params: React.PropTypes.object.isRequired,
    photos: React.PropTypes.array.isRequired
  },

  render () {
    return (
      <div>
        <h1>Page {this.props.params.page}</h1>
        <ul>
          {this.props.photos.map(photo => <li key={photo.id}><PhotoListItem {...photo} /></li>)}
        </ul>
      </div>
    );
  }
});

export default PhotosByPage;
