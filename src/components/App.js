'use strict';

import React from 'react';
import {Link} from 'react-router';
import AltContainer from 'alt/AltContainer';
import Store from '../stores/AppStore';
import Actions from '../actions/AppActions';

const App = React.createClass({
  propTypes: {
    children: React.PropTypes.element
  },

  render () {
    return (
      <div>
        <h1><Link to='/'>Instagram</Link></h1>
        <AltContainer store={Store} actions={Actions}>
          {this.props.children}
        </AltContainer>
        <footer>
          <p>Powered by <a href='https://github.com/lukekarrys/universal-static-instagram'>lukekarrys/universal-static-instagram</a></p>
        </footer>
      </div>
    );
  }
});

export default App;
