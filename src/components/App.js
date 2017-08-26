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
    return (
      <div>
        <Toolbar>
          <NavLink is={Link} to='/'>Home</NavLink>
          <NavLink is={Link} to='/tags'>Tags</NavLink>
          <NavLink is={Link} to='/pages'>Pages</NavLink>
        </Toolbar>
        <Container is='section' pt={4}>
          {this.props.children}
        </Container>
        <Container is='footer' mt={5} mb={5}>
          <Flex justify='center'>
            <Box>
              <ButtonOutline color='gray' href='https://github.com/lukekarrys/universal-static-instagram'>
                Powered by universal-static-instagram
              </ButtonOutline>
            </Box>
          </Flex>
        </Container>
      </div>
    );
  }
}
