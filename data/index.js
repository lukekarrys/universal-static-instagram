'use strict';

import zeroFill from 'zero-fill';
import readData from './readData';

class KeySets {
  constructor (options = {}) {
    this.options = options;
    this.values = {};
  }

  add (key, id) {
    if (this.values[key] === undefined) {
      this.values[key] = [];
    }
    this.values[key].push(id);
  }
}

class ByTag extends KeySets {
  constructor () {
    super();
  }

  add (tag, id) {
    if (tag.indexOf('#') === 0) {
      tag = tag.slice(1);
    }
    super.add(tag, id);
  }

  addTags (tags, id) {
    tags.forEach((tag) => this.add(tag, id));
  }
}

class ByDate extends KeySets {
  constructor () {
    super();
  }

  add (time, id) {
    const date = new Date(Number(time) * 1000);
    const year = date.getFullYear();
    const month = year + '/' + zeroFill(2, date.getMonth() + 1);
    const day = month + '/' + zeroFill(2, date.getDate());

    super.add(year, id);
    super.add(month, id);
    super.add(day, id);
  }
}

class ByPage extends KeySets {
  constructor (options) {
    super(options);
  }

  add (index, id) {
    const page = Math.floor(index / this.options.pagination);
    super.add(page + 1, id);
  }
}

const buildData = (cb) => {
  const byTag = new ByTag();
  const byDate = new ByDate();
  const byPage = new ByPage({pagination: 10});
  const byId = {};
  readData((err, data) => {
    if (err) {
      return cb(err);
    }
    data.forEach((datum, index) => {
      const {filter, tags, created_time, id} = datum;
      byTag.addTags(tags, id);
      byTag.add(filter || 'No Filter', id);
      byDate.add(created_time, id);
      byPage.add(index, id);
      byId[id] = datum;
    });
    cb(null, {
      ids: byId,
      tags: byTag.values,
      dates: byDate.values,
      pages: byPage.values
    });
  });
};

export default buildData;
