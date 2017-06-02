'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TagLink from './TagLink';
import Links from '../ui/Links';

export default class TagsList extends Component {
  static propTypes = {
    tags: PropTypes.array.isRequired
  };

  render() {
    const {tags} = this.props;

    return (
      <Links justify='space-between' links={tags.map((tag) => <TagLink tag={tag.id} key={tag.id}>{tag.name}</TagLink>)} />
    );
  }
}
