'use strict';

import React, {PropTypes} from 'react';
import TagLink from './TagLink';

const TagsList = React.createClass({
  propTypes: {
    tags: PropTypes.array.isRequired
  },

  render () {
    return (
      <ul>
        {this.props.tags.map(tag => <li key={tag}><TagLink tag={tag} /></li>)}
      </ul>
    );
  }
});

export default TagsList;
