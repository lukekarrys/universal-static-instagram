'use strict';

import React, {Component, PropTypes} from 'react';
import PageContainer from './PageContainer';
import PagesList from '../components/page/PagesList';
import {connect} from 'react-redux';
import {loadPages} from '../actions';
import mapKeyToProps from '../helpers/mapKeyToProps';

@connect(mapKeyToProps('pages'), {loadData: loadPages})
export default class Pages extends Component {
  static propTypes = {
    pages: PropTypes.array.isRequired
  }

  render() {
    const {pages, ...rest} = this.props;
    const component = <PagesList pages={pages} />;
    return (
      <PageContainer component={component} {...rest} />
    );
  }
}
