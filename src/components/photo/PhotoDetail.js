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
import Links from '../ui/Links';

export default class PhotoDetail extends Component {
  static propTypes = {
    previous: PropTypes.string,
    next: PropTypes.string,
    photo: PropTypes.shape({
      createdTime: PropTypes.string.isRequired,
      filter: PropTypes.string,
      tags: PropTypes.array.isRequired
    })
  };

  getLinks() {
    const {photo: {createdTime, tags, filter}, previous, next} = this.props;
    return [
      <PhotoLink path={previous} disabled={!previous} key={previous}>Previous</PhotoLink>,
      <PhotoLink path={next} disabled={!next} key={next}>Next</PhotoLink>,
      <PhotoLinkYear createdTime={createdTime} key={`year${createdTime}`} />,
      <PhotoLinkMonth createdTime={createdTime} key={`month${createdTime}`} />,
      <PhotoLinkDay createdTime={createdTime} key={`day${createdTime}`} />,
      ...[filter || 'Normal', ...tags].map((tag) => <TagLink tag={tag} key={tag}>{tag}</TagLink>)
    ];
  }

  render() {
    const {photo} = this.props;
    const links = this.getLinks();

    return (
      <div>
        <h1><PhotoTitle {...photo} /></h1>
        <h3><PhotoDate {...photo} /></h3>
        <PhotoImage {...photo} type='standard' />
        <p><PhotoLikes {...photo.likes} /></p>
        <PhotoComments {...photo.comments} />
        <p><PhotoLocation {...photo.location} /></p>
        <Links links={links} />
      </div>
    );
  }
}
