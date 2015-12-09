'use strict';

import sortBy from 'lodash/collection/sortBy';
import assign from 'lodash/object/assign';
import invoke from 'lodash/collection/invoke';
import pick from 'lodash/object/pick';
import map from 'lodash/collection/map';
import transform from 'lodash/object/transform';
import {camelizeKeys} from 'humps';
import {read} from 'instagram-download';
import {dateParts} from '../../src/helpers/date';
import slug from '../../src/helpers/slug';

const PAGINATION = 10;
const merge = (...parts) => assign(...[{}, ...parts]);
const toId = ({createdTime, id}) => {
  const {day, month, year} = dateParts({createdTime});
  return `${year}/${month}/${day}/${id}`;
};

class KeySets {
  constructor(options = {}) {
    this.options = options;
    this.values = {};
  }

  comparator({id}) {
    return id;
  }

  toObject(key, value) {
    return {id: key.toString(), ids: [], name: key.toString()};
  }

  add(key, id) {
    if (this.values[key] === undefined) {
      this.values[key] = this.toObject(key, id);
    }
    if (this.values[key].ids) {
      this.values[key].ids.push(id);
    }
  }

  getValues(photos) {
    const sorted = sortBy(this.values, this.comparator).map(this.addItemPagination);
    return transform(sorted, (result, val) => {
      if (val.ids && photos) {
        val.photos = val.ids.map((id) => photos[id].photo);
        delete val.ids;
      }
      result[val.id] = val;
    }, {});
  }

  addItemPagination(values, index, list) {
    const previous = index === 0 ? null : list[index - 1].id;
    const next = index === list.length - 1 ? null : list[index + 1].id;
    return merge(values, {previous, next});
  }
}

class ByTag extends KeySets {
  toObject(key, id) {
    const parent = super.toObject.apply(this, arguments);
    return assign(parent, {id: slug(key), type: 'tag'});
  }

  add(tags, id) {
    tags.forEach((tag) => super.add(tag.indexOf('#') === 0 ? tag.slice(1) : tag, id));
  }
}

class ByDay extends KeySets {
  toObject() {
    const parent = super.toObject.apply(this, arguments);
    return assign(parent, {type: 'day'});
  }

  add(createdTime, id) {
    const {day, month, year} = dateParts({createdTime});
    super.add(`${year}/${month}/${day}`, id);
  }
}

class ByMonth extends KeySets {
  toObject() {
    const parent = super.toObject.apply(this, arguments);
    return assign(parent, {type: 'month'});
  }

  add(createdTime, id) {
    const {month, year} = dateParts({createdTime});
    super.add(`${year}/${month}`, id);
  }
}

class ByYear extends KeySets {
  toObject() {
    const parent = super.toObject.apply(this, arguments);
    return assign(parent, {type: 'year'});
  }

  add(createdTime, id) {
    const {year} = dateParts({createdTime});
    super.add(`${year}`, id);
  }
}

class ByPage extends KeySets {
  comparator({id}) {
    return parseInt(id, 10);
  }

  toObject() {
    const parent = super.toObject.apply(this, arguments);
    return assign(parent, {type: 'page'});
  }

  add(index, id) {
    const page = Math.floor(index / PAGINATION);
    super.add(page + 1, id);
  }
}

class ById extends KeySets {
  comparator({photo}) {
    return Number(photo.createdTime);
  }

  toObject(id, photo) {
    return {id, photo};
  }
}

export default (options, cb) => read(options, (err, data) => {
  if (err) return cb(err);

  const byTag = new ByTag();
  const byDay = new ByDay();
  const byMonth = new ByMonth();
  const byYear = new ByYear();
  const byPage = new ByPage();
  const byId = new ById();

  data.forEach((datum, index) => {
    const photo = camelizeKeys(datum);
    const {filter, tags, createdTime, id} = photo;
    const dateId = toId({createdTime, id});
    photo.id = dateId;
    byTag.add(tags.concat(filter || 'Normal'), dateId);
    byDay.add(createdTime, dateId);
    byMonth.add(createdTime, dateId);
    byYear.add(createdTime, dateId);
    byPage.add(index, dateId);
    byId.add(dateId, photo);
  });

  const ids = byId.getValues();
  const tags = byTag.getValues(ids);
  const pages = byPage.getValues(ids);

  cb(null, {
    tags,
    pages,
    ids,
    dates: merge(...invoke([byDay, byMonth, byYear], 'getValues', ids)),
    tagKeys: map(tags, (item) => pick(item, 'id', 'name')),
    pageKeys: map(pages, (item) => pick(item, 'id', 'name'))
  });
});
