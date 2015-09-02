'use strict';

import {Schema, arrayOf} from 'normalizr';

const photos = new Schema('photos', {
  idAttribute: 'id'
});

const pages = new Schema('pages', {
  idAttribute: 'id'
});

const tags = new Schema('tags', {
  idAttribute: 'id'
});

export default {
  photo: photos,
  photos: arrayOf(photos),
  tags: arrayOf(tags),
  pages: arrayOf(pages)
};
