'use strict';

import React from 'react';

const PhotoImage = React.createClass({
  propTypes: {
    images: React.PropTypes.object.isRequired,
    type: React.PropTypes.oneOf(['thumbnail', 'low', 'standard']),
    prefix: React.PropTypes.string
  },

  getDefaultProps () {
    return {
      prefix: '/media/'
    };
  },

  imageName () {
    const {type} = this.props;
    return type === 'low' || type === 'standard' ?
      type + '_resolution' :
      type;
  },

  imageProps () {
    const image = this.props.images[this.imageName()];
    const {height, width} = image;
    let {url} = image;
    if (this.props.prefix) {
      url = url.replace(/https?:\/\//, this.props.prefix);
    }
    return {
      width,
      height,
      src: url
    };
  },

  render () {
    return (
      <img {...this.imageProps()} />
    );
  }
});

export default PhotoImage;
