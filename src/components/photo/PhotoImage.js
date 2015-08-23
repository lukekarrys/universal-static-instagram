'use strict';

import React, {PropTypes} from 'react';
const prefix = '/media/';

const PhotoImage = React.createClass({
  propTypes: {
    images: PropTypes.object.isRequired,
    type: PropTypes.oneOf(['thumbnail', 'low', 'standard']).isRequired
  },

  imageName () {
    const {type} = this.props;
    return type === 'low' || type === 'standard' ?
      `${type}_resolution` :
      type;
  },

  imageProps () {
    const image = this.props.images[this.imageName()];

    const {height, width} = image;
    let {url} = image;

    if (prefix) {
      url = url.replace(/https?:\/\//, prefix);
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
