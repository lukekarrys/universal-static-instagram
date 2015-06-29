'use strict';

import React from 'react';
import PhotoImage from './PhotoImage';
import PhotoDate from './PhotoDate';
import PhotoLink from './PhotoLink';
import PhotoTitle from './PhotoTitle';

const PhotoListItem = React.createClass({
  propTypes: {
    image: React.PropTypes.string
  },

  getDefaultProps () {
    return {
      image: 'thumbnail'
    };
  },

  render () {
    return (
      <span>
        <PhotoLink {...this.props}>
          {this.props.image ? <PhotoImage {...this.props} type={this.props.image} /> : null}
          <PhotoDate {...this.props} />
          <PhotoTitle {...this.props} />
        </PhotoLink>
      </span>
    );
  }
});

export default PhotoListItem;
