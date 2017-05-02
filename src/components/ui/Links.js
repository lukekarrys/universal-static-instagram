'use strict';

import React, {Component} from 'react';

import PropTypes from 'prop-types';

export default class Links extends Component {
  static propTypes = {
    links: PropTypes.arrayOf(PropTypes.element).isRequired
  };

  render() {
    const {links} = this.props;

    return (
      <div className='flex flex-wrap mxn1'>
        {links.map((link, index) =>
          <div key={index} className='mb2 px1'>
            {React.cloneElement(link, {className: 'btn btn-outline'})}
          </div>
        )}
      </div>
    );
  }
}
