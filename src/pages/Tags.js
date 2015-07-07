'use strict';

import React, {PropTypes} from 'react';
import Loading from '../components/Loading';
import TagsList from '../components/tag/TagsList';

const Tags = React.createClass({
  propTypes: {
    store: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  },

  statics: {
    getStoreName () {
      return 'Tags';
    }
  },

  render () {
    const {tags, loading} = this.props.store;
    return (
      <div>
        <h1>Tags</h1>
        {loading ? <Loading /> : <TagsList tags={tags} />}
      </div>
    );
  }
});

export default Tags;
