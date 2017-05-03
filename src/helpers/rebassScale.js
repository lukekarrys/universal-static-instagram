import rMargin from 'rebass/dist/util/margins';
import rPadding from 'rebass/dist/util/padding';
import config from 'rebass/dist/config';

// Note that these wont work with context
export const margin = (obj) => rMargin(obj, config.scale);
export const padding = (obj) => rPadding(obj, config.scale);
