'use strict';

import React, {PropTypes} from 'react';

const PhotoImage = React.createClass({
  propTypes: {
    images: PropTypes.object,
    type: PropTypes.oneOf(['thumbnail', 'low', 'standard']),
    prefix: PropTypes.string
  },

  getDefaultProps () {
    return {
      prefix: '/media/',
      type: 'thumbnail',
      images: {}
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

    if (!image) return null;

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
    const imageProps = this.imageProps();
    return (
      imageProps ? <img {...imageProps} /> : null
    );
  }
});

export default PhotoImage;
