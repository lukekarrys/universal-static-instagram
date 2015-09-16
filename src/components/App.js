'use strict';

import React, {Component} from 'react';
import {Link} from 'react-router';
import Container from 'rebass/dist/Container';
import Toolbar from 'rebass/dist/Toolbar';
import Footer from 'rebass/dist/Footer';

export default class App extends Component {
  static propTypes = {
    children: React.PropTypes.element.isRequired
  }

  render () {
    return (
      <div>
        <Toolbar>
          <Link to='/' className='NavItem btn'>USI</Link>
          <Link to='/tags' className='NavItem btn'>Tags</Link>
          <Link to='/pages' className='NavItem btn'>Pages</Link>
        </Toolbar>
        <Container>
          {this.props.children}
          <Footer>
            <div className='flex'>
              <div className='flex-auto px2'>
                Created by
                {' '}
                <a href='https://github.com/lukekarrys'>lukekarrys</a>
              </div>
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
