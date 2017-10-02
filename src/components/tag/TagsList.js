'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Flex, Box, ButtonOutline} from 'rebass';
import TagLink from './TagLink';
import PageHeader from '../PageHeader';

export default class TagsList extends Component {
  static propTypes = {
    tags: PropTypes.array.isRequired
  };

  render() {
    const {tags} = this.props;

    return [
      <PageHeader key='page-header' heading='Tags' />,
      <Flex
        key='links'
        wrap
        justify='space-between'
        ml={-2}
        mr={-2}
      >
        {tags.map((tag) => (
          <Box key={tag.id} m={2}>
            <TagLink tag={tag.id} is={ButtonOutline}>
              {tag.name}
            </TagLink>
          </Box>
        ))}
      </Flex>
    ];
  }
}
