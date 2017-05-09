'use strict';

const getMediaSrc = (image) => image.url && image.url.replace(/https?:\/\//, '/media/');
const getHighestRes = (obj) => obj.highResolution || obj.highResolutionCropped || obj.standardResolution;

export default (img) => getMediaSrc(img);
export const highRes = (media) => getMediaSrc(getHighestRes(media));
