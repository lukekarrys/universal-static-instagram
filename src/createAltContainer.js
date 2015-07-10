'use strict';

import React from 'react';
import AltContainer from 'alt/altContainer';
import result from 'lodash/object/result';
import transform from 'lodash/object/transform';

const createElement = (Component, componentProps) => {
  const stores = result(Component, 'getStores');

  if (!stores) {
    return <Component {...componentProps} />;
  }

  const props = {inject: componentProps, component: Component};

  if (stores.length === 1) {
    props.store = stores[0];
  }
  else {
    props.stores = transform(stores, (res, store) => {
      res[store.displayName] = store;
    }, {});
  }

  return <AltContainer {...props} />;
};

export default createElement;
