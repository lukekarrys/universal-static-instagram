'use strict';

import React, {PropTypes} from 'react';
import PhotoImage from './PhotoImage';
import PhotoDate from './PhotoDate';
import PhotoTitle from './PhotoTitle';
import PhotoLink from './PhotoLink';
import TagLink from '../tag/TagLink';


const PhotoDetail = React.createClass({
  propTypes: {
    tags: PropTypes.array.isRequired,
    created_time: PropTypes.string.isRequired,
    filter: PropTypes.string
  },

  render () {
    const {created_time, filter} = this.props;
    return (
      <div>
        <h1><PhotoTitle {...this.props} /></h1>
        <h3><PhotoDate {...this.props} /></h3>
        <PhotoImage {...this.props} type='standard' />
        <ul>
          <li><PhotoLink type='year' created_time={created_time} /></li>
          <li><PhotoLink type='month' created_time={created_time} /></li>
          <li><PhotoLink type='day' created_time={created_time} /></li>
          <li><TagLink tag={filter || 'Normal'} /></li>
          {this.props.tags.map(tag => <li key={tag}><TagLink tag={tag} /></li>)}
        </ul>
      </div>
    );
  }
});

export default PhotoDetail;
