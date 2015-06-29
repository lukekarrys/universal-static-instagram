'use strict';

import React from 'react';
import {Link} from 'react-router';
import PhotoListItem from './PhotoListItem';

const PhotosByPage = React.createClass({
  propTypes: {
    params: React.PropTypes.object.isRequired,
    photos: React.PropTypes.array.isRequired
  },

  render () {
    const {page} = this.props.params;
    return (
      <div>
        <h1>Page {page}</h1>
        <ul>
          {this.props.photos.map(photo => <li key={photo.id}><PhotoListItem {...photo} /></li>)}
        </ul>
        <ul>
          <li><Link to={`/pages/${Number(page) - 1}`}>Prev</Link></li>
          <li><Link to={`/pages/${Number(page) + 1}`}>Next</Link></li>
        </ul>
      </div>
    );
  }
});

export default PhotosByPage;
