'use strict';

import React from 'react';
import {Link} from 'react-router';
import PhotosByPage from './PhotosByPage';

const App = React.createClass({
  propTypes: {
    children: React.PropTypes.element
  },

  render () {
    return (
      <div>
        <h1><Link to='/'>Instagram</Link></h1>
        {this.props.children ? this.props.children : <PhotosByPage {...this.props} params={{page: 1}} />}
        <footer>
          <p>Powered by <a href='https://github.com/lukekarrys/universal-react-instagram'>lukekarrys/universal-react-instagram</a></p>
        </footer>
      </div>
    );
  }
});

export default App;
