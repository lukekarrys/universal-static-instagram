import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Heading, Subhead, Border} from 'rebass';

export default class PageHeader extends Component {
  static propTypes = {
    heading: PropTypes.string.isRequired,
    description: PropTypes.string
  };

  render() {
    const {heading, description} = this.props;

    return (
      <Border bottom mb={4} pb={2}>
        <Heading>{heading}</Heading>
        {description && <Subhead>{description}</Subhead>}
      </Border>
    );
  }
}
