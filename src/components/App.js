'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';
import {Container, Toolbar, Footer, Section, NavItem, ButtonOutline} from 'rebass';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  }

  render() {
    return (
      <div>
        <Toolbar>
          <NavItem is={Link} to='/'>Home</NavItem>
          <NavItem is={Link} to='/tags'>Tags</NavItem>
          <NavItem is={Link} to='/pages'>Pages</NavItem>
        </Toolbar>
        <Container>
          <Section>{this.props.children}</Section>
          <Footer>
            <span>
              Powered by <ButtonOutline href='https://github.com/lukekarrys/universal-static-instagram'>universal-static-instagram</ButtonOutline>
            </span>
          </Footer>
        </Container>
      </div>
    );
  }
}
