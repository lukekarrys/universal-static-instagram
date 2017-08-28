'use strict';

import React, {Component, cloneElement} from 'react';
import PropTypes from 'prop-types';
import {Group, ButtonOutline, Flex, Box} from 'rebass';
import PhotoImage from './PhotoImage';
import PhotoLink from './PhotoLink';
import PhotoLinkYear from './PhotoLinkYear';
import PhotoLinkMonth from './PhotoLinkMonth';
import PhotoLinkDay from './PhotoLinkDay';
import PhotoLikes from './PhotoLikes';
import PhotoComments from './PhotoComments';
import PhotoLocation from './PhotoLocation';
import TagLink from '../tag/TagLink';
import photoTitle from '../../helpers/photoTitle';
import photoDate from '../../helpers/photoDate';
import PageHeader from '../PageHeader';

export default class PhotoDetail extends Component {
  static propTypes = {
    previous: PropTypes.string,
    next: PropTypes.string,
    photo: PropTypes.shape({
      createdTime: PropTypes.string,
      filter: PropTypes.string,
      tags: PropTypes.array
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
        <PageHeader heading={photoTitle(photo)} description={photoDate(photo)} />
        <PhotoImage {...photo} type='standardResolution' />
        <Flex wrap>
          <Box width={1} mb={1}><PhotoLocation {...photo.location} /></Box>
          <Box width={1} mb={1}><PhotoLikes {...photo.likes} /></Box>
          <Box width={1} mb={1}><PhotoComments {...photo.comments} /></Box>
          <Box width={1}>
            <Group>
              {links.map((link) => cloneElement(link, {
                is: ButtonOutline
              }))}
            </Group>
          </Box>
        </Flex>
      </div>
    );
  }
}
