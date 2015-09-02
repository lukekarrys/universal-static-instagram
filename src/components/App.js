'use strict';

import React, {Component} from 'react';
import {Link} from 'react-router';

export default class App extends Component {
  static propTypes = {
    children: React.PropTypes.element.isRequired
  }

  render () {
    return (
      <div>
        <h1><Link to='/'>Home</Link></h1>
        {this.props.children}
        <footer>
          <p>Powered by <a href='https://github.com/lukekarrys/universal-static-instagram'>lukekarrys/universal-static-instagram</a></p>
        </footer>
      </div>
    );
  }
}
