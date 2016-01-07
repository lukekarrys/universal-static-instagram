'use strict';

import React, {Component, PropTypes} from 'react';
import PageLink from './PageLink';
import Links from '../ui/Links';

export default class PagesList extends Component {
  static propTypes = {
    pages: PropTypes.array.isRequired
  };

  render() {
    const {pages} = this.props;

    return (
      <Links links={pages.map((page) => <PageLink page={page.id} key={page.id}>{page.name}</PageLink>)} />
    );
  }
}
