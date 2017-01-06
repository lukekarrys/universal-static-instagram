'use strict';

import {schema, arrayOf} from 'normalizr';

const photos = new schema.Entity('photos', {
  idAttribute: 'id'
});

const pages = new schema.Entity('pages', {
  idAttribute: 'id'
});

const tags = new schema.Entity('tags', {
  idAttribute: 'id'
});

export default {
  photo: photos,
  photos: new Schema.Array(photos),
  tags: new Schema.Array(tags),
  pages: new Schema.Array(pages)
};
