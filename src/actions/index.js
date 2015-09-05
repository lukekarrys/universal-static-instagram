'use strict';

import pathToKey from '../helpers/pathToKey';

const loadKey = (stateKey, fetch) => (path) => (dispatch, getState) => {
  const key = pathToKey(path);
  const {isFetching = false, ids = []} = getState()[stateKey].byId[key] || {};

  // Dont fetch again if we already have some photos
  if (isFetching || ids.length) return null;

  return dispatch(fetch(key));
};

export const PHOTO_REQUEST = 'PHOTO_REQUEST';
export const PHOTO_SUCCESS = 'PHOTO_SUCCESS';
export const PHOTO_FAILURE = 'PHOTO_FAILURE';

export const loadPhoto = (path) => (dispatch, getState) => {
  const key = pathToKey(path);
  const {entities, byId} = getState().photos;
  const {isFetching = false, ids} = byId[key] || {};
  const photo = entities[ids] || {};

  // link only appears if a photo is fetched individually
  if (isFetching || photo.hasOwnProperty('link')) {
    return null;
  }

  return dispatch({
    endpoint: key,
    types: [PHOTO_REQUEST, PHOTO_SUCCESS, PHOTO_FAILURE],
    key: 'photo'
  });
};

export const PHOTOS_REQUEST = 'PHOTOS_REQUEST';
export const PHOTOS_SUCCESS = 'PHOTOS_SUCCESS';
export const PHOTOS_FAILURE = 'PHOTOS_FAILURE';

export const loadPhotos = loadKey('photos', (endpoint) => ({
  endpoint,
  types: [PHOTOS_REQUEST, PHOTOS_SUCCESS, PHOTOS_FAILURE],
  key: 'photos'
}));

export const TAGS_REQUEST = 'TAGS_REQUEST';
export const TAGS_SUCCESS = 'TAGS_SUCCESS';
export const TAGS_FAILURE = 'TAGS_FAILURE';

export const loadTags = loadKey('tags', (endpoint) => ({
  endpoint,
  types: [TAGS_REQUEST, TAGS_SUCCESS, TAGS_FAILURE],
  key: 'tags'
}));

export const PAGES_REQUEST = 'PAGES_REQUEST';
export const PAGES_SUCCESS = 'PAGES_SUCCESS';
export const PAGES_FAILURE = 'PAGES_FAILURE';

export const loadPages = loadKey('pages', (endpoint) => ({
  endpoint,
  types: [PAGES_REQUEST, PAGES_SUCCESS, PAGES_FAILURE],
  key: 'pages'
}));
