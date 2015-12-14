'use strict';

import React from 'react';
import {createDevTools} from 'redux-devtools';
import SliderMonitor from 'redux-slider-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

const DEFAULT_SIZE = 0.15;

export default createDevTools(
  <DockMonitor
    toggleVisibilityKey='ctrl-h'
    changePositionKey='ctrl-q'
    defaultPosition='bottom'
    defaultSize={DEFAULT_SIZE}
  >
    <SliderMonitor keyboardEnabled />
  </DockMonitor>
);
