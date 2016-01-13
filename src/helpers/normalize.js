'use strict';

import {normalize} from 'normalizr';
import {omit} from 'lodash';
import Schemas from './schema';

export default ({json, key}) => {
  if (!json || !key) return {};

  const schema = Schemas[key];
  const schemaKey = (schema._itemSchema || schema)._key;

  const {result, entities} = normalize(json[key], schema);

  return {
    entities: entities[schemaKey],
    result: {
      ids: result,
      ...omit(json, schemaKey, key)
    }
  };
};
