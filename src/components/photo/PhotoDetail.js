'use strict';

import React, {Component, PropTypes} from 'react';
import PhotoImage from './PhotoImage';
import PhotoDate from './PhotoDate';
import PhotoTitle from './PhotoTitle';
import PhotoLink from './PhotoLink';
import PhotoLinkYear from './PhotoLinkYear';
import PhotoLinkMonth from './PhotoLinkMonth';
import PhotoLinkDay from './PhotoLinkDay';
import PhotoLikes from './PhotoLikes';
import PhotoComments from './PhotoComments';
import PhotoLocation from './PhotoLocation';
import TagLink from '../tag/TagLink';

export default class PhotoDetail extends Component {
  static propTypes = {
    previous: PropTypes.string,
    next: PropTypes.string,
    photo: PropTypes.shape({
      createdTime: PropTypes.string.isRequired,
      filter: PropTypes.string,
      tags: PropTypes.array.isRequired
    })
  }

  render () {
    const {photo, previous, next} = this.props;
    const {createdTime, filter, tags} = photo;
    return (
      <div>
        <h1><PhotoTitle {...photo} /></h1>
        <h3><PhotoDate {...photo} /></h3>
        <PhotoImage {...photo} type='standard' />
        <PhotoLikes {...photo.likes} />
        <PhotoComments {...photo.comments} />
        <PhotoLocation {...photo.location} />
        <ul>
          <li><PhotoLink path={previous} disabled={!previous}>Previous</PhotoLink></li>
          <li><PhotoLink path={next} disabled={!next}>Next</PhotoLink></li>
          <li><PhotoLinkYear createdTime={createdTime} /></li>
          <li><PhotoLinkMonth createdTime={createdTime} /></li>
          <li><PhotoLinkDay createdTime={createdTime} /></li>
          {tags.concat(filter || 'Normal').map((tag) =>
            <li key={tag}><TagLink tag={tag}>{tag}</TagLink></li>
          )}
        </ul>
      </div>
    );
  }
}
