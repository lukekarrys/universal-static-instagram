'use strict';

import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const TagsList = React.createClass({
  propTypes: {
    tags: PropTypes.array,
    fetchTags: PropTypes.func
  },

  componentDidMount () {
    this.props.fetchTags();
  },

  render () {
    return (
      <div>
        <h1>Tags</h1>
        <ul>
          {this.props.tags.map(tag =>
            <li key={tag}><Link to={`/tags/${tag}`}>{tag}</Link></li>
          )}
        </ul>
      </div>
    );
  }
});

export default TagsList;
