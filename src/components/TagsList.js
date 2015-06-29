'use strict';

import React from 'react';
import {Link} from 'react-router';

const TagsList = React.createClass({
  propTypes: {
    tags: React.PropTypes.array.isRequired
  },

  render () {
    return (
      <div>
        <h1>Tags</h1>
        <ul>
          {this.props.tags.map(tag =>
            <li><Link to={`/tags/${tag}`}>{tag}</Link></li>
          )}
        </ul>
      </div>
    );
  }
});

export default TagsList;
