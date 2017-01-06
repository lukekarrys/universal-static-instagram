'use strict';

import {schema} from 'normalizr';

const photos = new schema.Entity('photos');

const pages = new schema.Entity('pages');

const tags = new schema.Entity('tags');

export default {
  photo: photos,
  photos: new schema.Array(photos),
  tags: new schema.Array(tags),
  pages: new schema.Array(pages)
};
