'use strict';

import React, {PropTypes} from 'react';
import PhotoImage from './PhotoImage';
import PhotoDate from './PhotoDate';
import PhotoLink from './PhotoLink';
import PhotoTitle from './PhotoTitle';

const PhotosList = React.createClass({
  propTypes: {
    photos: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired
  },

  render () {
    return (
      <ul>
        {this.props.photos.map((photo) => {
          return (
            <li key={photo.id}>
              <PhotoLink {...photo}>
                <PhotoImage {...photo} type={this.props.type} />
                <PhotoDate {...photo} /> - <PhotoTitle {...photo} />
              </PhotoLink>
            </li>
          );
        })}
      </ul>
    );
  }
});

export default PhotosList;
