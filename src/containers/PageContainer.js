'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {SectionHeader} from 'rebass';
import PageError from '../components/PageError';

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
      return (
        <div>
          <SectionHeader title='Error' />
          <PageError error={error} />
        </div>
      );
    }

    if (loading) {
      return (
        <div>
          <SectionHeader title='Loading...' />
        </div>
      );
    }

    return component;
  }
}
