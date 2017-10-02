'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Container, Toolbar, NavLink, ButtonOutline, Flex, Box} from 'rebass';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    return [
      <Toolbar key='toolbar'>
        <NavLink is={Link} to='/'>Home</NavLink>
        <NavLink is={Link} to='/tags'>Tags</NavLink>
        <NavLink is={Link} to='/pages'>Pages</NavLink>
      </Toolbar>,
      <Container key='section' is='section' pt={4}>
        {this.props.children}
      </Container>,
      <Container key='footer' is='footer' mt={5} mb={5}>
        <Flex justify='center'>
          <Box>
            {/* TODO: fix button hover color being blue */}
            <ButtonOutline color='gray' href='https://github.com/lukekarrys/universal-static-instagram'>
              Powered by universal-static-instagram
            </ButtonOutline>
          </Box>
        </Flex>
      </Container>
    ];
  }
}
