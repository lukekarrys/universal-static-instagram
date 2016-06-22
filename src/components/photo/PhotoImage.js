'use strict';

import React, {Component, PropTypes} from 'react';

const getMediaSrc = (image) => image.url && image.url.replace(/https?:\/\//, '/media/');
const getHighestRes = (obj) => obj.highResolution || obj.highResolutionCropped || obj.standardResolution;

export default class PhotoImage extends Component {
  static propTypes = {
    images: PropTypes.object.isRequired,
    videos: PropTypes.object,
    type: PropTypes.oneOf([
      'thumbnail',
      'lowResolution',
      'standardResolution',
      'highResolution',
      'highResolutionCropped'
    ]).isRequired,
    style: PropTypes.object,
    link: PropTypes.bool
  };

  render() {
    const {style, type, images, videos, link} = this.props;
    const media = videos || images;
    const mediaEl = React.createElement(videos ? 'video' : 'img', {
      style,
      autoPlay: true,
      controls: true,
      poster: getMediaSrc(images[type]),
      src: getMediaSrc(media[type])
    });

    return link ? <a href={getMediaSrc(getHighestRes(media))} target='_blank' children={mediaEl} /> : mediaEl;
  }
}
