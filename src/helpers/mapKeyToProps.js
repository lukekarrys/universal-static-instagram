'use strict';

import pathToKey from './pathToKey';

const endsWithS = (str) => str.charAt(str.length - 1) === 's';
const pluralize = (str) => endsWithS(str) ? str : `${str}s`;
const singularize = (str) => endsWithS(str) ? str.slice(0, -1) : str;

const mapKeyToProps = (stateKey) => (state) => {
  const pluralKey = pluralize(stateKey);
  const singularKey = singularize(stateKey);
  const isSingular = stateKey === singularKey;

  const {router} = state;
  const fetchKey = pathToKey(router ? router.location.pathname : null);

  const {byId = {}, entities = {}} = state[pluralKey];
  const byPath = byId[fetchKey] || {};
  const {loading = true, ids, error = null, ...rest} = byPath;

  let result;
  if (!ids) {
    result = isSingular ? {} : [];
  }
  else {
    result = Array.isArray(ids) ? ids.map((k) => entities[k]) : entities[ids];
  }

  return {
    error,
    loading,
    fetchKey,
    [stateKey]: result,
    ...rest
  };
};

export default mapKeyToProps;
