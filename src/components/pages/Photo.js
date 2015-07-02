'use strict';

import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {getDay, getMonth, getYear} from '../../helpers/permalink';
import PhotoImage from '../photo/PhotoImage';
import PhotoDate from '../photo/PhotoDate';
import PhotoTitle from '../photo/PhotoTitle';

const Photo = React.createClass({
  propTypes: {
    location: PropTypes.object.isRequired,
    photo: PropTypes.object,
    fetchPhoto: PropTypes.func
  },

  _fetchPhoto (props) {
    this.props.fetchPhoto(props.location.pathname);
  },

  componentDidMount () {
    this._fetchPhoto(this.props);
  },

  componentWillReceiveProps (nextProps) {
    if (nextProps.photo.id !== this.props.photo.id) {
      this._fetchPhoto(nextProps);
    }
  },

  render () {
    const {photo} = this.props;
    const {id} = photo;
    return (
      id ? <div>
        <h1><PhotoTitle {...photo} /></h1>
        <h3><PhotoDate {...photo} /></h3>
        <PhotoImage {...photo} type='standard' />
        <ul>
          <li><Link to={getYear(photo)}>year</Link></li>
          <li><Link to={getMonth(photo)}>month</Link></li>
          <li><Link to={getDay(photo)}>day</Link></li>
          <li><Link to={`/tags/${photo.filter}`}>{photo.filter}</Link></li>
          {photo.tags.map(tag => <li key={tag}><Link to={`/tags/${tag}`}>{tag}</Link></li>)}
        </ul>
      </div>
      :
      null
    );
  }
});

export default Photo;
