'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import InternalLink from '../InternalLink';
import slash from '../../helpers/slash';

export default class PhotoLink extends Component {
  static propTypes = {
    path: PropTypes.string
  }

  render() {
    const {path, ...rest} = this.props;
    return (
      <InternalLink to={`/photos${slash(path)}`} {...rest} />
    );
  }
}
