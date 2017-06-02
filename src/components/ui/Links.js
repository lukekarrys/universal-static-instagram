'use strict';

import React, {Component, cloneElement} from 'react';
import PropTypes from 'prop-types';
import {ButtonOutline, Block} from 'rebass';
import {Flex} from 'reflexbox';
import {margin} from '../../helpers/rebassScale';

export default class Links extends Component {
  static propTypes = {
    links: PropTypes.arrayOf(PropTypes.element).isRequired,
    group: PropTypes.bool,
    justify: PropTypes.string
  };

  render() {
    const {links, group, justify} = this.props;

    const groupProps = (i) => {
      if (!group) return {rounded: true};
      if (i === 0) return {rounded: 'left'};
      if (i === links.length - 1) return {rounded: 'right', style: {marginLeft: -1}};
      return {rounded: false, style: {marginLeft: -1}};
    };

    const styles = {
      container: {},
      block: {m: 0}
    };

    if (!group) {
      const xSpacing = 1;
      const offset = margin({m: xSpacing}).margin * -1;
      styles.block = {mb: 1, mt: 0, mx: xSpacing};
      styles.container = {marginLeft: offset, marginRight: offset};
    }

    return (
      <Flex wrap justify={justify} style={styles.container}>
        {links.map((link, index) => (
          <Block
            key={index}
            {...styles.block}
            children={cloneElement(link, {
              is: ButtonOutline,
              ...groupProps(index)
            })}
          />
        ))}
      </Flex>
    );
  }
}
