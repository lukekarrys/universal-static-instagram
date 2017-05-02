'use strict';

import React, {Component, cloneElement} from 'react';
import PropTypes from 'prop-types';
import {ButtonOutline} from 'rebass';

export default class Links extends Component {
  static propTypes = {
    links: PropTypes.arrayOf(PropTypes.element).isRequired,
    group: PropTypes.bool
  }

  render() {
    const {links, group} = this.props;

    const groupProps = (i) => {
      if (!group) return {rounded: true};
      if (i === 0) return {rounded: 'left'};
      if (i === links.length - 1) return {rounded: 'right', style: {marginLeft: -1}};
      return {rounded: false, style: {marginLeft: -1}};
    };

    return (
      <div>
        {links.map((link, index) => cloneElement(link, {
          is: ButtonOutline,
          ...groupProps(index)
        }))}
      </div>
    );
  }
}
