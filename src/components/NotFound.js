'use strict';

import React, {Component} from 'react';
import PageLink from './page/PageLink';
import TagLink from './tag/TagLink';
import Links from './ui/Links';
import InternalLink from './InternalLink';
import PageHeader from './PageHeader';

export default class NotFound extends Component {
  render() {
    return (
      <div>
        <PageHeader heading='Not Found' />
        Nothing to see here. You probably want one of these:
        <Links
          group
          links={[
            <PageLink key='pages'>Pages</PageLink>,
            <TagLink key='tags'>Tags</TagLink>,
            <InternalLink key='home' to='/'>Home</InternalLink>
          ]}
        />
      </div>
    );
  }
}
