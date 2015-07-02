'use strict';

import React, {PropTypes} from 'react';
import PhotoImage from './PhotoImage';
import PhotoDate from './PhotoDate';
import PhotoLink from './PhotoLink';
import PhotoTitle from './PhotoTitle';

const PhotoListItem = React.createClass({
  propTypes: {
    image: PropTypes.string
  },

  getDefaultProps () {
    return {
      image: 'thumbnail'
    };
  },

  render () {
    return (
      <PhotoLink {...this.props}>
        <PhotoImage {...this.props} type={this.props.image} />
        <PhotoDate {...this.props} /> - <PhotoTitle {...this.props} />
      </PhotoLink>
    );
  }
});

export default PhotoListItem;
