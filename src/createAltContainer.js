'use strict';

import React from 'react';
import AltContainer from 'alt/altContainer';
import result from 'lodash/object/result';
import PagesStore from './stores/PagesStore';
import PhotosStore from './stores/PhotosStore';
import PhotoStore from './stores/PhotoStore';
import TagsStore from './stores/TagsStore';
import PagesActions from './actions/PagesActions';
import PhotosActions from './actions/PhotosActions';
import PhotoActions from './actions/PhotoActions';
import TagsActions from './actions/TagsActions';

const Stores = {PagesStore, PhotosStore, PhotoStore, TagsStore};
const Actions = {PagesActions, PhotosActions, PhotoActions, TagsActions};

const createElement = (Component, componentProps) => {
  const storeName = result(Component, 'getStoreName');

  if (!storeName) return <Component {...componentProps} />;

  const props = {
    stores: {store: Stores[storeName + 'Store']},
    actions: {actions: Actions[storeName + 'Actions']},
    inject: componentProps,
    component: Component
  };

  if (typeof window !== 'undefined') {
    props.actions.actions.fetch(componentProps.location.pathname);
  }

  return <AltContainer {...props} />;
};

export default createElement;
