'use strict';

import React, {PropTypes} from 'react';
import PhotosList from './PhotosList';
import TagLink from '../tag/TagLink';
import PageLink from '../page/PageLink';
import PhotoLink from '../photo/PhotoLink';

const PhotosBy = React.createClass({
  propTypes: {
    photos: PropTypes.array.isRequired,
    // Params that come from react router path
    year: PropTypes.string,
    month: PropTypes.string,
    day: PropTypes.string,
    tag: PropTypes.string,
    page: PropTypes.string
  },

  getType () {
    const {year, month, day, tag, page} = this.props;
    if (year) return 'date';
    if (tag) return 'tag';
    return 'page';
  },

  getTitle () {
    const {year, month, day, tag, page} = this.props;
    if (year) return `Date ${year || ''} ${month || ''} ${day || ''}`.trim();
    if (tag) return `Tag ${tag}`;
    return `Page ${page || 1}`;
  },

  render () {
    const page = this.props.page || 1;
    const {photos, year, month, day} = this.props;
    const title = this.getTitle();
    const type = this.getType();
    const links = [];

    if (type === 'date') {
      const date = {year, month, day};
      if (day || month) links.push(<PhotoLink {...date} type='year' />);
      if (day) links.push(<PhotoLink {...date} type='month' />);
    }
    else if (type === 'tag') {
      links.push(<TagLink>Other tags</TagLink>);
    }
    else if (type === 'page') {
      links.push(
        <PageLink page={Number(page) - 1}>Prev</PageLink>,
        <PageLink page={Number(page) + 1}>Next</PageLink>,
        <PageLink>All pages</PageLink>
      );
    }

    return (
      <div>
        <h1>{title}</h1>
        <PhotosList photos={photos} type='thumbnail' />
        <ul>{links.map((link, index) => <li key={index}>{link}</li>)}</ul>
      </div>
    );
  }
});

export default PhotosBy;
