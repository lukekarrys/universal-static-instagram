'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import InternalLink from '../InternalLink';
import slash from '../../helpers/slash';

export default class PageLink extends Component {
  static propTypes = {
    page: PropTypes.string
  }

  render() {
    const {page, ...rest} = this.props;
    return (
      <InternalLink to={`/pages${slash(page)}`} {...rest} />
    );
  }
}
