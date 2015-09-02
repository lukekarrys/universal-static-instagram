'use strict';

import React, {Component, PropTypes} from 'react';
import assign from 'lodash/object/assign';
import Loading from './Loading';
import PageError from './PageError';

export default class PageContainer extends Component {
  static propTypes = {
    loadData: PropTypes.func.isRequired,
    pathname: PropTypes.string.isRequired,
    component: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.instanceOf(Error)
  }

  componentDidMount () {
    this.props.loadData(this.props.pathname);
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.pathname !== this.props.pathname) {
      this.props.loadData(nextProps.pathname);
    }
  }

  render () {
    const {loading, error, component, data, ...componentProps} = this.props;

    if (error) {
      return (
        <PageError error={error} />
      );
    }

    if (loading) {
      return (
        <Loading />
      );
    }

    return React.createElement(component, assign(componentProps, data));
  }
}
