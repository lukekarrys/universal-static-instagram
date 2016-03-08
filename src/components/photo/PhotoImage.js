'use strict';

import React, {Component, PropTypes} from 'react';
const prefix = '/media/';

export default class PhotoImage extends Component {
  static propTypes = {
    images: PropTypes.object.isRequired,
    type: PropTypes.oneOf([
      'thumbnail',
      'lowResolution',
      'standardResolution',
      'highResolution',
      'highResolutionCropped'
    ]).isRequired,
    style: PropTypes.object
  };

  imageSrc() {
    const image = this.props.images[this.props.type];

    let {url} = image;

    if (prefix) {
      url = url.replace(/https?:\/\//, prefix);
    }

    return url;
  }

  render() {
    const {style} = this.props;
    return (
      <img src={this.imageSrc()} style={style} />
    );
  }
}
