'use strict';

import * as ACTIONS from '../actions';
import merge from 'lodash/object/merge';
import includes from 'lodash/collection/includes';
import {combineReducers} from 'redux';

const createReducer = (request, success, failure) => (state = {entities: {}, byId: {}}, action) => {
  const mergeState = (source) => merge({}, state, source);
  const isAction = (type) => Array.isArray(type) ? includes(type, action.type) : type === action.type;

  if (isAction(request)) {
    return mergeState({
      byId: {[action.key]: {isFetching: true, error: null}}
    });
  }

  if (isAction(failure)) {
    return mergeState({
      byId: {[action.key]: {isFetching: false, error: action.error}}
    });
  }

  if (isAction(success)) {
    return mergeState({
      entities: {...action.entities},
      byId: {
        [action.key]: {
          isFetching: false,
          error: null,
          ...action.result
        }
      }
    });
  }

  return state;
};

export default combineReducers({
  tags: createReducer(ACTIONS.TAGS_REQUEST, ACTIONS.TAGS_SUCCESS, ACTIONS.TAGS_FAILURE),
  pages: createReducer(ACTIONS.PAGES_REQUEST, ACTIONS.PAGES_SUCCESS, ACTIONS.PAGES_FAILURE),
  photos: createReducer(
    [ACTIONS.PHOTO_REQUEST, ACTIONS.PHOTOS_REQUEST],
    [ACTIONS.PHOTO_SUCCESS, ACTIONS.PHOTOS_SUCCESS],
    [ACTIONS.PHOTO_FAILURE, ACTIONS.PHOTOS_FAILURE]
  )
});
