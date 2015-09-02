'use strict';

import React, {Component, PropTypes} from 'react';
import TagLink from './TagLink';

export default class TagsList extends Component {
  static propTypes = {
    tags: PropTypes.array.isRequired
  }

  render () {
    return (
      <ul>
        {this.props.tags.map((tag) =>
          <li key={tag.id}><TagLink tag={tag.id}>{tag.name}</TagLink></li>
        )}
      </ul>
    );
  }
}
