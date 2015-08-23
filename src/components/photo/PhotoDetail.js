'use strict';

import React, {Component, PropTypes} from 'react';
import PhotoImage from './PhotoImage';
import PhotoDate from './PhotoDate';
import PhotoTitle from './PhotoTitle';
import PhotoLink from './PhotoLink';
import TagLink from '../tag/TagLink';

export default class PhotoDetail extends Component {
  static propTypes = {
    photo: PropTypes.object.isRequired
  }

  render () {
    const {photo} = this.props;
    const {created_time, filter, tags} = photo;
    return (
      <div>
        <h1><PhotoTitle {...photo} /></h1>
        <h3><PhotoDate {...photo} /></h3>
        <PhotoImage {...photo} type='standard' />
        <ul>
          <li><PhotoLink type='year' created_time={created_time} /></li>
          <li><PhotoLink type='month' created_time={created_time} /></li>
          <li><PhotoLink type='day' created_time={created_time} /></li>
          <li><TagLink tag={filter || 'Normal'} /></li>
          {tags.map((tag) => <li key={tag}><TagLink tag={tag} /></li>)}
        </ul>
      </div>
    );
  }
}
