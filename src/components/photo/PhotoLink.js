'use strict';

import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import permalink from '../../helpers/permalink';

const PhotoLink = React.createClass({
  propTypes: {
    created_time: PropTypes.string,
    id: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]).isRequired
  },

  render () {
    const {created_time, id, children} = this.props;
    return (
      <Link to={permalink({created_time, id})}>{children}</Link>
    );
  }
});

export default PhotoLink;
