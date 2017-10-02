'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Flex, Box, ButtonOutline} from 'rebass';
import PageLink from './PageLink';
import PageHeader from '../PageHeader';

export default class PagesList extends Component {
  static propTypes = {
    pages: PropTypes.array.isRequired
  };

  render() {
    const {pages} = this.props;

    return [
      <PageHeader key='page-header' heading='Pages' />,
      <Flex
        key='links'
        wrap
        justify='space-between'
        ml={-2}
        mr={-2}
      >
        {pages.map((page) => (
          <Box key={page.id} m={2}>
            <PageLink page={page.id} is={ButtonOutline}>
              {page.name}
            </PageLink>
          </Box>
        ))}
      </Flex>
    ];
  }
}
