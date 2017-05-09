'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import photoSrc, {highRes} from '../../helpers/photoSrc';

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
    style: PropTypes.object
  }

  render() {
    const {style, type, images, videos} = this.props;
    const media = videos || images;
    const mediaEl = React.createElement(videos ? 'video' : 'img', {
      style,
      autoPlay: true,
      controls: true,
      poster: photoSrc(images[type]),
      src: photoSrc(media[type])
    });

    return <a href={highRes(media)} target='_blank' rel='noopener noreferrer' children={mediaEl} />;
  }
}
