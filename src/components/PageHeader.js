import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Heading, Text} from 'rebass';

export default class PageHeader extends Component {
  static propTypes = {
    heading: PropTypes.string.isRequired,
    description: PropTypes.string
  };

  render() {
    const {heading, description} = this.props;

    return (
      <div>
        <Heading>{heading}</Heading>
        {description && <Text>{description}</Text>}
      </div>
    );
  }
}
