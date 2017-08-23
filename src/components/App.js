'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Container, Toolbar, NavLink, ButtonOutline} from 'rebass';
import Footer from './Footer';
import Section from './Section';

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
        <Container>
          <Section>{this.props.children}</Section>
          <Footer>
            <ButtonOutline href='https://github.com/lukekarrys/universal-static-instagram'>
              Powered by universal-static-instagram
            </ButtonOutline>
          </Footer>
        </Container>
      </div>
    );
  }
}
