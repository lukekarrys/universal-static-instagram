'use strict';

import React, {Component, PropTypes} from 'react';
import PageContainer from '../components/PageContainer';
import PagesList from '../components/page/PagesList';
import {connect} from 'react-redux';
import {loadPages} from '../actions';
import mapKeyToProps from '../helpers/mapKeyToProps';

@connect(mapKeyToProps('pages'), {loadPages})
export default class Pages extends Component {
  static propTypes = {
    location: PropTypes.shape({pathname: PropTypes.string.isRequired}).isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.instanceOf(Error),
    pages: PropTypes.array.isRequired,
    loadPages: PropTypes.func.isRequired
  }

  render () {
    const {pages, loading, error} = this.props;
    const {pathname} = this.props.location;
    const loadData = this.props.loadPages;
    return (
      <div>
        <h1>Pages</h1>
        <PageContainer
          component={PagesList}
          data={{pages}}
          {...{error, loading, loadData, pathname}}
        />
      </div>
    );
  }
}
