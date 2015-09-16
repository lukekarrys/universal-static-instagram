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

  getLinks () {
    const {photo: {createdTime, tags, filter}, previous, next} = this.props;
    return [
      <PhotoLink path={previous} disabled={!previous}>Previous</PhotoLink>,
      <PhotoLink path={next} disabled={!next}>Next</PhotoLink>,
      <PhotoLinkYear createdTime={createdTime} />,
      <PhotoLinkMonth createdTime={createdTime} />,
      <PhotoLinkDay createdTime={createdTime} />,
      ...[filter || 'Normal', ...tags].map((tag) => <TagLink tag={tag}>{tag}</TagLink>)
    ];
  }

  render () {
    const {photo} = this.props;
    return (
      <div>
        <h1><PhotoTitle {...photo} /></h1>
        <h3><PhotoDate {...photo} /></h3>
        <PhotoImage {...photo} type='standard' />
        <p><PhotoLikes {...photo.likes} /></p>
        <p><PhotoComments {...photo.comments} /></p>
        <p><PhotoLocation {...photo.location} /></p>
        <div className='flex flex-wrap'>
          {this.getLinks().map((link, index) =>
            <div key={index} className='mb2 px1'>
              {React.cloneElement(link, {className: 'btn btn-outline'})}
            </div>
          )}
        </div>
      </div>
    );
  }
}
