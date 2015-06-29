'use strict';

import React from 'react';
import {Link} from 'react-router';
import {day, month, year} from '../helpers/permalink';
import PhotoImage from './PhotoImage';
import PhotoDate from './PhotoDate';
import PhotoTitle from './PhotoTitle';

const Photo = React.createClass({
  propTypes: {
    filter: React.PropTypes.string,
    tags: React.PropTypes.array
  },

  render () {
    return (
      <div>
        <h1><PhotoTitle {...this.props} /></h1>
        <h3><PhotoDate {...this.props} /></h3>
        <PhotoImage {...this.props} type='standard' />
        <ul>
          <li><Link to={year(this.props)}>year</Link></li>
          <li><Link to={month(this.props)}>month</Link></li>
          <li><Link to={day(this.props)}>day</Link></li>
          <li>Filter: <Link to={`/tags/${this.props.filter}`}>{this.props.filter}</Link></li>
          {this.props.tags.map(tag => <li><Link to={`/tags/${tag}`}>{tag}</Link></li>)}
        </ul>
      </div>
    );
  }
});

export default Photo;
