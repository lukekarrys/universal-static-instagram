'use strict';

import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const PagesList = React.createClass({
  propTypes: {
    pages: PropTypes.array.isRequired,
    fetchPages: PropTypes.func.isRequired
  },

  componentDidMount () {
    this.props.fetchPages();
  },

  render () {
    return (
      <div>
        <h1>Pages</h1>
        <ul>
          {this.props.pages.map(page =>
            <li key={page}><Link to={`/pages/${page}`}>{page}</Link></li>
          )}
        </ul>
      </div>
    );
  }
});

export default PagesList;
