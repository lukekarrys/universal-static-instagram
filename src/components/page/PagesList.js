'use strict';

import React, {PropTypes} from 'react';
import PageLink from './PageLink';

const PagesList = React.createClass({
  propTypes: {
    pages: PropTypes.array.isRequired
  },

  render () {
    return (
      <ul>
        {this.props.pages.map((page) => <li key={page}><PageLink page={page} /></li>)}
      </ul>
    );
  }
});

export default PagesList;
