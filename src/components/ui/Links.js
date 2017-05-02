'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Links extends Component {
  static propTypes = {
    links: PropTypes.arrayOf(PropTypes.element).isRequired
  }

  render() {
    const {links} = this.props;

    return (
      <div>{links}</div>
    );
  }
}
