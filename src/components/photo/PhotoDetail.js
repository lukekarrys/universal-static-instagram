'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {PageHeader, Block} from 'rebass';
import PhotoImage from './PhotoImage';
import PhotoLink from './PhotoLink';
import PhotoLinkYear from './PhotoLinkYear';
import PhotoLinkMonth from './PhotoLinkMonth';
import PhotoLinkDay from './PhotoLinkDay';
import PhotoLikes from './PhotoLikes';
import PhotoComments from './PhotoComments';
import PhotoLocation from './PhotoLocation';
import TagLink from '../tag/TagLink';
import Links from '../ui/Links';
import photoTitle from '../../helpers/photoTitle';
import photoDate from '../../helpers/photoDate';

export default class PhotoDetail extends Component {
  static propTypes = {
    previous: PropTypes.string,
    next: PropTypes.string,
    photo: PropTypes.shape({
      createdTime: PropTypes.string,
      filter: PropTypes.string,
      tags: PropTypes.array
    })
  }

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
        <PageHeader heading={photoTitle(photo)} description={photoDate(photo)} />
        <PhotoImage {...photo} type='standardResolution' />
        <Block><PhotoLocation {...photo.location} /></Block>
        <Block><PhotoLikes {...photo.likes} /></Block>
        <Block><PhotoComments {...photo.comments} /></Block>
        <Block><Links links={links} group /></Block>
      </div>
    );
  }
}
