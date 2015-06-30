'use strict';

import React from 'react';
import PhotoListItem from './photo/PhotoListItem';

const PhotosByDate = React.createClass({
  propTypes: {
    params: React.PropTypes.object.isRequired,
    photos: React.PropTypes.array.isRequired
  },

  render () {
    return (
      <div>
        <h1>Date {this.props.params.year} {this.props.params.month} {this.props.params.day}</h1>
        <ul>
          {this.props.photos.map(photo => <li key={photo.id}><PhotoListItem {...photo} /></li>)}
        </ul>
      </div>
    );
  }
});

export default PhotosByDate;
