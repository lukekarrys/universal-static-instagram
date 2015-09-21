'use strict';

import React, {Component, PropTypes} from 'react';
const prefix = '/media/';

export default class PhotoImage extends Component {
  static propTypes = {
    images: PropTypes.object.isRequired,
    type: PropTypes.oneOf(['thumbnail', 'low', 'standard']).isRequired,
    style: PropTypes.object
  }

  imageName () {
    const {type} = this.props;
    return type === 'low' || type === 'standard'
      ? `${type}Resolution`
      : type;
  }

  imageSrc () {
    const imageName = this.imageName();
    const image = this.props.images[imageName];

    let {url} = image;

    if (prefix) {
      url = url.replace(/https?:\/\//, prefix);
    }

    return url;
  }

  render () {
    const {style} = this.props;
    return (
      <img src={this.imageSrc()} style={style} />
    );
  }
}
