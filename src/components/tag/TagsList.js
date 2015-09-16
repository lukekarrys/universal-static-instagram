'use strict';

import React, {Component, PropTypes} from 'react';
import TagLink from './TagLink';

export default class TagsList extends Component {
  static propTypes = {
    tags: PropTypes.array.isRequired
  }

  render () {
    return (
      <div className='flex flex-wrap flex-justify'>
        {this.props.tags.map((tag) =>
          <div className='px1 mt2' key={tag.id}>
            <TagLink tag={tag.id} className='btn btn-outline'>{tag.name}</TagLink>
          </div>
        )}
      </div>
    );
  }
}
