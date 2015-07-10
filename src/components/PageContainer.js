'use strict';

import React, {PropTypes} from 'react';
import Loading from './Loading';
import PageError from './PageError';

const PageContainer = React.createClass({
  propTypes: {
    component: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.instanceOf(Error)
  },

  render () {
    const {loading, error, component, ...componentProps} = this.props;

    if (loading) {
      return (
        <Loading />
      );
    }

    if (error) {
      return (
        <PageError />
      );
    }

    return React.createElement(component, componentProps);
  }
});

export default PageContainer;
