'use strict';

import React, {Component, PropTypes} from 'react';

const getImageSrc = (image) => image.url && image.url.replace(/https?:\/\//, '/media/');

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
    style: PropTypes.object,
    link: PropTypes.boolean
  };

  render() {
    const {style, type, images, link} = this.props;
    const imageSrc = images[type];
    const linkSrc = images.highResolution || images.highResolutionCropped || images.standardResolution;

    const image = <img src={getImageSrc(imageSrc)} style={style} />;

    if (link) {
      return (
        <a href={getImageSrc(linkSrc)} target='_blank'>
          {image}
        </a>
      );
    }

    return image;
  }
}
