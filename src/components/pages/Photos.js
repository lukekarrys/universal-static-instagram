'use strict';

import React, {PropTypes} from 'react';
import PhotosList from '../photo/PhotosList';

const PhotosByTag = React.createClass({
  propTypes: {
    params: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    photos: PropTypes.array.isRequired,
    fetchPhotos: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.element])
  },

  _fetchPhotos (props) {
    const {pathname} = props.location;
    props.fetchPhotos(pathname === '/' ? '/pages/1' : pathname);
  },

  componentDidMount () {
    this._fetchPhotos(this.props);
  },

  componentWillReceiveProps (nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this._fetchPhotos(nextProps);
    }
  },

  getTitle () {
    const {params} = this.props;
    const {year, month, day, tag, page} = params;
    if (year) return `Date ${year || ''} ${month || ''} ${day || ''}`;
    if (tag) return `Tag ${tag}`;
    return `Page ${page || 1}`;
  },

  render () {
    return (
      <div>
        <h1>{this.getTitle()}</h1>
        <PhotosList photos={this.props.photos} type='thumbnail' />
        {this.props.children}
      </div>
    );
  }
});

export default PhotosByTag;
