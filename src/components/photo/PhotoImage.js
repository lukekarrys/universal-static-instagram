'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import getSrc, {highRes} from '../../helpers/photoImage';

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
      poster: getSrc(images[type]),
      src: getSrc(media[type])
    });

    return <a href={highRes(media)} target='_blank' children={mediaEl} />;
  }
}
