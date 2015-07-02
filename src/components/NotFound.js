'use strict';

import React from 'react';
import {Link} from 'react-router';

const NotFound = React.createClass({
  render () {
    return (
      <div>
        <h1>Not Found</h1>
        <p>
            Check out the
            <Link to='/pages'>pages</Link>,
            <Link to='/tags'>tags</Link>, or
            <Link to='/'>home page</Link>.
        </p>
      </div>
    );
  }
});

export default NotFound;
