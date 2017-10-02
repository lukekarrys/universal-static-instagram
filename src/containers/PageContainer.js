'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import PageError from '../components/PageError';
import PageHeader from '../components/PageHeader';

export default class PageContainer extends Component {
  static propTypes = {
    loadData: PropTypes.func.isRequired,
    fetchKey: PropTypes.string.isRequired,
    component: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.instanceOf(Error)
  };

  componentDidMount() {
    this.props.loadData(this.props.fetchKey);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.fetchKey !== this.props.fetchKey) {
      this.props.loadData(nextProps.fetchKey);
    }
  }

  render() {
    const {loading, error, component} = this.props;

    if (error) {
      return [
        <PageHeader key='page-header' heading='Error' />,
        <PageError key='page-error' error={error} />
      ];
    }

    if (loading) {
      return (
        <PageHeader heading='Loading...' />
      );
    }

    return component;
  }
}
