'use strict';

import React, {Component, PropTypes} from 'react';
import PageLink from './PageLink';

export default class PagesList extends Component {
  static propTypes = {
    pages: PropTypes.array.isRequired
  }

  render () {
    return (
      <div className='flex flex-wrap'>
        {this.props.pages.map((page) =>
          <div className='px1 mt2' key={page.id}>
            <PageLink page={page.id} className='btn btn-outline'>{page.name}</PageLink>
          </div>
        )}
      </div>
    );
  }
}
