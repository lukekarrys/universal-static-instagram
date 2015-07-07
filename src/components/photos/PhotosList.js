'use strict';

import React, {PropTypes} from 'react';
import PhotoImage from '../photo/PhotoImage';
import PhotoDate from '../photo/PhotoDate';
import PhotoLink from '../photo/PhotoLink';
import PhotoTitle from '../photo/PhotoTitle';

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
              <PhotoLink {...photo} type='id'>
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
