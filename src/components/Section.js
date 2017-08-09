import React from 'react';
import {Container} from 'rebass';
import PropTypes from 'prop-types';

const Section = (props) => (
  <Container is='section' py={4}>
    {props.children}
  </Container>
);

Section.propTypes = {
  children: PropTypes.element.isRequired
};

export default Section;
