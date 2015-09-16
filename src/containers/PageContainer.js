'use strict';

import React, {Component, PropTypes} from 'react';
import Section from 'rebass/dist/Section';
import SectionHeader from 'rebass/dist/SectionHeader';
import assign from 'lodash/object/assign';
import PageError from '../components/PageError';

export default class PageContainer extends Component {
  static propTypes = {
    loadData: PropTypes.func.isRequired,
    fetchKey: PropTypes.string.isRequired,
    component: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.instanceOf(Error)
  }

  componentDidMount () {
    this.props.loadData(this.props.fetchKey);
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.fetchKey !== this.props.fetchKey) {
      this.props.loadData(nextProps.fetchKey);
    }
  }

  render () {
    const {loading, error, component, data, ...componentProps} = this.props;

    if (error) {
      return (
        <Section>
          <SectionHeader title='Error' />
          <PageError error={error} />
        </Section>
      );
    }

    if (loading) {
      return (
        <Section>
          <SectionHeader title='Loading...' />
        </Section>
      );
    }

    return (
      <Section>
        {React.createElement(component, assign(componentProps, data))}
      </Section>
    );
  }
}
