'use strict';

export default ({
  caption,
  defaultText = 'Untitled Photo'
} = {}) => caption ? caption.text : defaultText;
