'use strict';

import React, {Component, PropTypes} from 'react';
import Link from '../InternalLink';
import slug from '../../helpers/slug';
import slash from '../../helpers/slash';

export default class TagLink extends Component {
  static propTypes = {
    tag: PropTypes.string,
    children: PropTypes.node.isRequired,
    disabled: PropTypes.bool
  }

  render () {
    const {tag, children, disabled} = this.props;
    const tagSlug = tag ? slug(tag, {lower: true}) : tag;
    return (
      <Link to={`/tags${slash(tagSlug)}`} disabled={disabled}>{children}</Link>
    );
  }
}
