'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Link from '../InternalLink';
import slash from '../../helpers/slash';

export default class PageLink extends Component {
  static propTypes = {
    page: PropTypes.string,
    children: PropTypes.node.isRequired
  };

  render() {
    const {page, children, ...rest} = this.props;
    return (
      <Link to={`/pages${slash(page)}`} {...rest}>{children}</Link>
    );
  }
}
