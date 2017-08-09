import React from 'react';
import {Container} from 'rebass';
import PropTypes from 'prop-types';

const Footer = (props) => (
  <footer>
    <Container>
      {props.children}
    </Container>
  </footer>
);

Footer.propTypes = {
  children: PropTypes.element.isRequired
};

export default Footer;
