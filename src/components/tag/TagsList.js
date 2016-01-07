'use strict';

import React, {Component, PropTypes} from 'react';
import TagLink from './TagLink';
import Links from '../ui/Links';

export default class TagsList extends Component {
  static propTypes = {
    tags: PropTypes.array.isRequired
  };

  render() {
    const {tags} = this.props;

    return (
      <Links links={tags.map((tag) => <TagLink tag={tag.id} key={tag.id}>{tag.name}</TagLink>)} />
    );
  }
}
