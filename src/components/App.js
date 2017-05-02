'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';
import Container from 'rebass/dist/Container';
import Toolbar from 'rebass/dist/Toolbar';
import Footer from 'rebass/dist/Footer';
import Section from 'rebass/dist/Section';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    return (
      <div>
        <Toolbar>
          <Link to='/' className='NavItem btn'>Home</Link>
          <Link to='/tags' className='NavItem btn'>Tags</Link>
          <Link to='/pages' className='NavItem btn'>Pages</Link>
        </Toolbar>
        <Container>
          <Section>{this.props.children}</Section>
          <Footer>
            <div className='flex'>
              <div className='flex-auto right-align px2'>
                Powered by
                {' '}
                <a href='https://github.com/lukekarrys/universal-static-instagram'>universal-static-instagram</a>
              </div>
            </div>
          </Footer>
        </Container>
      </div>
    );
  }
}
