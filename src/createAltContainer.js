'use strict';

import React from 'react';
import AltContainer from 'alt/altContainer';
import Store from '../src/stores/AppStore';
import Actions from '../src/actions/AppActions';

const createElement = (Component, componentProps) => {
  const props = {
    store: Store,
    actions: Actions,
    component: Component,
    inject: componentProps
  };
  return <AltContainer {...props} />;
};

export default createElement;
