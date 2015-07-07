'use strict';

import React from 'react';
import {Link} from 'react-router';
import PageLink from './page/PageLink';
import TagLink from './tag/TagLink';

const NotFound = React.createClass({
  render () {
    return (
      <div>
        <h1>Not Found</h1>
        <p>
            Check out the
            {' '}
            <PageLink>pages</PageLink>,
            {' '}
            <TagLink>tags</TagLink>,
            {' or '}
            <Link to='/'>home page</Link>.
        </p>
      </div>
    );
  }
});

export default NotFound;
