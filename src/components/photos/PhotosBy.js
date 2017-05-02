'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {compact} from 'lodash';
import dateFormat from 'dateformat';
import {SectionHeader} from 'rebass';
import PhotosList from './PhotosList';
import TagLink from '../tag/TagLink';
import PageLink from '../page/PageLink';
import PhotoLink from '../photo/PhotoLink';
import PhotoLinkYear from '../photo/PhotoLinkYear';
import PhotoLinkMonth from '../photo/PhotoLinkMonth';
import Links from '../ui/Links';
import {propsToDate} from '../../helpers/date';

const formatPath = (path, format) => dateFormat(propsToDate({path}), format);

export default class PhotosBy extends Component {
  static propTypes = {
    photos: PropTypes.array.isRequired,
    type: PropTypes.oneOf(['page', 'tag', 'year', 'month', 'day']),
    name: PropTypes.string,
    previous: PropTypes.string,
    next: PropTypes.string
  }

  getTitle() {
    const {type, name} = this.props;
    switch (type) {
    case 'page':
      return `Page ${name}`;
    case 'tag':
      return `Tag ${name}`;
    case 'year':
      return formatPath(name, 'yyyy');
    case 'month':
      return formatPath(name, 'mmmm yyyy');
    case 'day':
      return formatPath(name, 'mmmm d, yyyy');
    default:
      return '';
    }
  }

  getLinks() {
    const {type, previous, next, name} = this.props;

    switch (type) {
    case 'page':
      return [
        <PageLink page={previous} disabled={!previous} key={`page-${previous}`}>Prev</PageLink>,
        <PageLink page={next} disabled={!next} key={`page-${next}`}>Next</PageLink>,
        <PageLink key='page-all'>All pages</PageLink>
      ];
    case 'tag':
      return [
        <TagLink tag={previous} disabled={!previous} key={`tag-${previous}`}>Prev</TagLink>,
        <TagLink tag={next} disabled={!next} key={`tag-${next}`}>Next</TagLink>,
        <TagLink key='tag-other'>Other tags</TagLink>
      ];
    case 'year':
    case 'month':
    case 'day':
      return [
        <PhotoLink path={previous} disabled={!previous} key={`photo-${previous}`}>Previous</PhotoLink>,
        <PhotoLink path={next} disabled={!next} key={`photo-${next}`}>Next</PhotoLink>,
        (type === 'month' || type === 'day') && <PhotoLinkYear path={name} key={`photo-year-${name}`} />,
        (type === 'day') && <PhotoLinkMonth path={name} key={`photo-month-${name}`} />
      ];
    default:
      return [];
    }
  }

  render() {
    const {photos} = this.props;
    const title = this.getTitle();
    const links = compact(this.getLinks());

    return (
      <div>
        <SectionHeader heading={title} />
        <PhotosList photos={photos} type='thumbnail' />
        <Links links={links} group />
      </div>
    );
  }
}
