'use strict';

import React, {Component, cloneElement} from 'react';
import {Group, ButtonOutline, Text} from 'rebass';
import PageLink from './page/PageLink';
import TagLink from './tag/TagLink';
import InternalLink from './InternalLink';
import PageHeader from './PageHeader';

export default class NotFound extends Component {
  render() {
    const links = [
      <PageLink key='pages'>Pages</PageLink>,
      <TagLink key='tags'>Tags</TagLink>,
      <InternalLink key='home' to='/'>Home</InternalLink>
    ];

    return (
      <div>
        <PageHeader heading='Not Found' />
        <Text mb={3}>Nothing to see here. You probably want one of these:</Text>
        <Group>
          {links.map((link) => cloneElement(link, {
            is: ButtonOutline
          }))}
        </Group>
      </div>
    );
  }
}
