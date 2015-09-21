'use strict';

import React, {Component, PropTypes} from 'react';
import PhotoImage from '../photo/PhotoImage';
import PhotoDate from '../photo/PhotoDate';
import PhotoLink from '../photo/PhotoLink';
import PhotoTitle from '../photo/PhotoTitle';
import Media from 'rebass/dist/Media';

export default class PhotosList extends Component {
  static propTypes = {
    photos: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired
  }

  render () {
    return (
      <div>
        {this.props.photos.map((photo) =>
          <div className='mb2' key={photo.id}>
            <Media
              middle={true}
              image={<PhotoImage images={photo.images} type={this.props.type} />}
            >
              <p><PhotoLink path={photo.id}><PhotoDate createdTime={photo.createdTime} /></PhotoLink></p>
              <p><PhotoTitle caption={photo.caption} /></p>
              <p>
                Comments: {photo.comments.count}
                {' '}
                Likes: {photo.likes.count}
              </p>
            </Media>
          </div>
        )}
      </div>
    );
  }
}
