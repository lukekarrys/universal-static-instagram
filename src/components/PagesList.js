'use strict';

import React from 'react';
import {Link} from 'react-router';

const PagesList = React.createClass({
  propTypes: {
    pages: React.PropTypes.array.isRequired
  },

  render () {
    return (
      <div>
        <h1>Pages</h1>
        <ul>
          {this.props.pages.map(page =>
            <li><Link to={`/pages/${page}`}>{page}</Link></li>
          )}
        </ul>
      </div>
    );
  }
});

export default PagesList;
