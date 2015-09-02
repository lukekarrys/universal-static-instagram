'use strict';

import React, {Component, PropTypes} from 'react';
const prefix = '/media/';

export default class PhotoImage extends Component {
  static propTypes = {
    images: PropTypes.object.isRequired,
    type: PropTypes.oneOf(['thumbnail', 'low', 'standard']).isRequired
  }

  imageName = () => {
    const {type} = this.props;
    return type === 'low' || type === 'standard' ?
      `${type}Resolution` :
      type;
  }

  imageProps = () => {
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
  }

  render () {
    return (
      <img {...this.imageProps()} />
    );
  }
}
