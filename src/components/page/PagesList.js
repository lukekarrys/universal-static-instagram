'use strict';

import React, {Component, PropTypes} from 'react';
import PageLink from './PageLink';

export default class PagesList extends Component {
  static propTypes = {
    pages: PropTypes.array.isRequired
  }

  render () {
    return (
      <ul>
        {this.props.pages.map((page) =>
          <li key={page.id}><PageLink page={page.id}>{page.name}</PageLink></li>
        )}
      </ul>
    );
  }
}
