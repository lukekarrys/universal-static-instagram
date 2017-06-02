'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import PageLink from './PageLink';
import Links from '../ui/Links';

export default class PagesList extends Component {
  static propTypes = {
    pages: PropTypes.array.isRequired
  };

  render() {
    const {pages} = this.props;

    return (
      <Links justify='space-between' links={pages.map((page) => <PageLink page={page.id} key={page.id}>{page.name}</PageLink>)} />
    );
  }
}
