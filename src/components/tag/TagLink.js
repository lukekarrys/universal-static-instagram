'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import InternalLink from '../InternalLink';
import slug from '../../helpers/slug';
import slash from '../../helpers/slash';

export default class TagLink extends Component {
  static propTypes = {
    tag: PropTypes.string
  };

  render() {
    const {tag, ...rest} = this.props;
    const tagSlug = tag ? slug(tag, {lower: true}) : tag;
    return (
      <InternalLink to={`/tags${slash(tagSlug)}`} {...rest} />
    );
  }
}
