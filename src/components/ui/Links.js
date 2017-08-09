'use strict';

import React, {Component, cloneElement} from 'react';
import PropTypes from 'prop-types';
import {ButtonOutline, Flex, Group} from 'rebass';
import Block from '../Block';

export default class Links extends Component {
  static propTypes = {
    links: PropTypes.arrayOf(PropTypes.element).isRequired,
    group: PropTypes.bool,
    justify: PropTypes.string
  };

  render() {
    const {links, group, justify} = this.props;

    const buttons = links.map((link, index) => (
      <Block
        key={index}
        children={cloneElement(link, {
          is: ButtonOutline
        })}
      />
    ));

    return (
      <Flex wrap justify={justify}>
        {group ? <Group>{buttons}</Group> : buttons}
      </Flex>
    );
  }
}
