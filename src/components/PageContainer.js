'use strict';

import React, {PropTypes, Component} from 'react';
import isEmpty from 'lodash/lang/isEmpty';
import some from 'lodash/collection/some';
import assign from 'lodash/object/assign';
import Loading from './Loading';
import PageError from './PageError';

class PageContainer extends Component {
  static propTypes = {
    component: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.instanceOf(Error)
  }

  render () {
    const {loading, error, component, data, ...componentProps} = this.props;
    const noData = some(data, isEmpty);

    // TODO/FIXME: noData should be an error message but we currently dont trigger
    // fetch actions until componentDidMount so we have one render cycle in
    // which there is noData so we treat it as loading state. This also
    // manifests itself as a bug where if we have old data in the store it gets
    // rendered for one cycle before the action is kicked off and then it is
    // set to loading state (but this isn't noticeable visually)
    if (loading || noData) {
      return (
        <Loading />
      );
    }

    if (error) {
      return (
        <PageError error={error} />
      );
    }

    return React.createElement(component, assign(componentProps, data));
  }
}

export default PageContainer;
