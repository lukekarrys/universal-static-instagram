'use strict';

import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import moment from 'moment';
import PhotoTitle from './PhotoTitle';
import permalink, {getDay, getMonth, getYear, propsToDate} from '../../helpers/permalink';

const PhotoLink = React.createClass({
  propTypes: {
    type: PropTypes.oneOf(['day', 'month', 'year', 'id']).isRequired,
    created_time: PropTypes.string,
    id: PropTypes.string,
    year: PropTypes.string,
    month: PropTypes.string,
    day: PropTypes.string,
    caption: PropTypes.object,
    children: PropTypes.node
  },

  getUrl () {
    const {type, created_time, id, year, month, day} = this.props;

    if (type === 'id') return permalink({created_time, id});

    const dateOpts = created_time ? {created_time} : {year, month, day};

    if (type === 'day') return getDay(dateOpts);
    if (type === 'month') return getMonth(dateOpts);
    if (type === 'year') return getYear(dateOpts);
  },

  getDefaultText () {
    const {type, created_time, year, month, day} = this.props;

    if (type === 'id') return <PhotoTitle caption={this.props.caption} />;

    let format;
    if (type === 'day') format = 'MMMM D YYYY';
    else if (type === 'month') format = 'MMMM YYYY';
    else if (type === 'year') format = 'YYYY';

    return moment(propsToDate({created_time, year, month, day})).format(format);
  },

  render () {
    return (
      <Link to={this.getUrl()}>{this.props.children || this.getDefaultText()}</Link>
    );
  }
});

export default PhotoLink;
